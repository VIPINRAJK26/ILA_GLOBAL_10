import axios from "axios";
import { clearAuthTokens, getAccessToken, getRefreshToken, notifyAuthenticationExpired, storeAuthTokens } from '../services/auth/tokenStorage';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
});

// Automatically inject JWT Bearer token if present in storage
axiosInstance.interceptors.request.use((config) => {
    try {
        const isRefreshCall = config.url?.includes('auth/token/refresh/');
        const token = getAccessToken();
        if (!isRefreshCall && token && !config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch {
        // Storage unavailable
    }
    return config;
});

let refreshPromise: Promise<string> | null = null;

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const request = error.config as (typeof error.config & { _authRetry?: boolean }) | undefined;
        const url = request?.url || '';
        if (error.response?.status !== 401 || !request || url.includes('auth/token/refresh/') || url.includes('auth/logout/')) {
            return Promise.reject(error);
        }

        // Credential-entry endpoints can return 401 for bad credentials. They must not
        // trigger a refresh loop or clear an otherwise valid current session.
        const credentialEndpoint = /auth\/(login|register|otp\/request|otp\/verify-login|password\/)/.test(url);
        if (credentialEndpoint) return Promise.reject(error);
        if (request._authRetry) {
            clearAuthTokens();
            notifyAuthenticationExpired();
            return Promise.reject(error);
        }

        const refreshToken = getRefreshToken();

        request._authRetry = true;
        try {
            if (!refreshPromise) {
                refreshPromise = axiosInstance
                    .post<{ access: string; refresh?: string }>(
                        'auth/token/refresh/',
                        refreshToken ? { refresh: refreshToken } : {},
                    )
                    .then(({ data }) => {
                        if (!data?.access) throw new Error('Refresh endpoint did not return an access token.');
                        storeAuthTokens({ access: data.access, refresh: data.refresh || refreshToken || undefined });
                        return data.access;
                    })
                    .finally(() => { refreshPromise = null; });
            }
            const accessToken = await refreshPromise;
            request.headers.Authorization = `Bearer ${accessToken}`;
            return axiosInstance(request);
        } catch (refreshError) {
            clearAuthTokens();
            notifyAuthenticationExpired();
            return Promise.reject(refreshError);
        }
    },
);

export default axiosInstance;


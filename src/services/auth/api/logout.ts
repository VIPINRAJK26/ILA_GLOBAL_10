import axiosInstance from '../../../api/axiosInstance';

/**
 * Clears auth cookies and blacklists refresh token
 * Endpoint: POST /api/auth/logout/
 */
export const logout = async (refreshToken?: string): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await axiosInstance.post<{ message?: string }>(
      'auth/logout/',
      refreshToken ? { refresh: refreshToken } : {}
    );
    return { success: true, message: response.data.message };
  } catch {
    // Even if backend fails, client clears local session
    return { success: true, message: 'Logged out locally.' };
  }
};

export default logout;

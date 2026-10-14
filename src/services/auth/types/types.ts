export type UserRole = 'student' | 'staff' | 'super_admin' | 'hr' | string;

export interface Franchise {
  id: number;
  name: string;
  code: string;
  parent?: number | null;
  level?: 'hq' | 'regional' | 'branch' | string;
  email?: string | null;
  phone_number?: string | null;
  city?: string;
  state?: string;
  country?: string;
  is_active?: boolean;
  children?: Franchise[];
}

export interface AuthUser {
  id: number | string;
  uuid?: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  name: string;
  phone?: string;
  phone_number?: string;
  role: UserRole;
  roles?: string[];
  is_active?: boolean;
  is_staff?: boolean;
  is_superuser?: boolean;
  avatar?: string;
  franchise_id?: number | null;
  franchise_name?: string;
  franchise_code?: string;
  franchises?: Franchise[];
  department?: string;
  destination?: string;
  program?: string;
  identifierCode?: string;
}

export interface CheckLoginResponse {
  isAuthenticated: boolean;
  user: AuthUser | null;
  message?: string;
}

export interface PasswordLoginPayload {
  identifier: string;
  password: string;
  remember_me?: boolean;
  role?: UserRole;
}

export interface PasswordLoginResponse {
  access?: string;
  refresh?: string;
  user?: AuthUser;
  message?: string;
  detail?: string;
}

export interface RegisterRequestOtpPayload {
  email?: string;
  phone?: string;
  phone_number?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  destination?: string;
  program?: string;
}

export interface RegisterRequestOtpResponse {
  success: boolean;
  message: string;
  channel?: 'email' | 'sms' | string;
  destination?: string;
  expires_in_seconds?: number;
  status_code?: number;
}

export interface RegisterVerifyOtpPayload {
  email?: string;
  phone?: string;
  username?: string;
  otp_code: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  destination?: string;
  program?: string;
  role?: UserRole;
}

export interface RegisterVerifyOtpResponse {
  success?: boolean;
  message?: string;
  user?: AuthUser;
  access?: string;
  refresh?: string;
}

export interface RegisterDirectPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: UserRole;
}

export interface RegisterDirectResponse {
  user?: AuthUser;
  tokens?: {
    access?: string;
    refresh?: string;
  };
  message?: string;
  success?: boolean;
}

export interface OtpRequestPayload {
  identifier: string;
  purpose?: 'login' | 'password_reset' | 'verification' | string;
}

export interface OtpRequestResponse {
  success: boolean;
  message: string;
  channel?: string;
  destination?: string;
  expires_in_seconds?: number;
}

export interface OtpVerifyLoginPayload {
  identifier: string;
  otp_code: string;
}

export interface OtpVerifyLoginResponse {
  success?: boolean;
  access?: string;
  refresh?: string;
  user?: AuthUser;
  message?: string;
}

export interface TokenRefreshPayload {
  refresh?: string;
}

export interface TokenRefreshResponse {
  access: string;
  refresh?: string;
}

export interface TokenVerifyPayload {
  token: string;
}

export interface TokenVerifyResponse {
  code?: string;
  detail?: string;
  [key: string]: any;
}

export interface CsrfResponse {
  csrfToken: string;
}

export interface PasswordResetRequestPayload {
  identifier: string;
}

export interface PasswordResetRequestResponse {
  success?: boolean;
  message: string;
}

export interface PasswordResetConfirmPayload {
  identifier: string;
  otp_code: string;
  new_password: string;
  new_password_confirm: string;
}

export interface PasswordResetConfirmResponse {
  success?: boolean;
  message: string;
}

export interface UpdateProfilePayload {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  avatar?: File | string | null;
  destination?: string;
  program?: string;
}

export interface PaginatedFranchisesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Franchise[];
}

export interface AuthValidationError {
  [field: string]: string[] | string | undefined;
}

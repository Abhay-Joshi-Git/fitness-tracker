export const AuthStateFeatureName = 'auth';

export interface AuthState {
    isAuthenticated: boolean;
    isAuthenticationDetermined: boolean;
}

export const InitialAuthState: AuthState = {
    isAuthenticated: false,
    isAuthenticationDetermined: false,
}

export interface AppState {
    [AuthStateFeatureName]: AuthState
}

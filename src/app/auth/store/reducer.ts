import { InitialAuthState, AuthState } from './state';
import { AuthAction, AuthActionType } from './actions';

export const authReducer = (state: AuthState = InitialAuthState, action: AuthAction) => {
    switch (action.type) {
        case AuthActionType.SET_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: action.value
            }
        case AuthActionType.SET_AUTHENTICATION_DETERMINED:
            return {
                ...state,
                isAuthenticationDetermined: action.value
            }
        default:
            console.log('returning auth state from reducer', state);
            state;
    }
};

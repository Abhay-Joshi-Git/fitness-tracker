import { AuthStateFeatureName, AuthState, InitialAuthState } from '../auth/store/state';
import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from '../auth/store/reducer';

export interface AppState {
    [AuthStateFeatureName]: AuthState
}

export const reducers: ActionReducerMap<AppState> = {
    [AuthStateFeatureName]: authReducer
};

export const InitialAppState: AppState = {
    [AuthStateFeatureName]: {
        isAuthenticated: false,
        isAuthenticationDetermined: false,
    }
};

import { AuthStateFeatureName, AuthState } from '../auth/store/state';

export interface AppState {
    [AuthStateFeatureName]: AuthState
}

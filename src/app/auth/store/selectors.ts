import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthStateFeatureName, AuthState } from './state';

export const authFeatureSelector = createFeatureSelector<AuthState>(AuthStateFeatureName);

export const isAuthenticatedSelector = createSelector(authFeatureSelector, (state) => state.isAuthenticated);
export const isAuthenticationDeterminedSelector = createSelector(authFeatureSelector, (state) => {
    return state.isAuthenticationDetermined;
});

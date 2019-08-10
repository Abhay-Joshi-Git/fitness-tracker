import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthStateFeatureName, AuthState } from './state';
import { AppState } from 'src/app/store/state';

// export const authFeatureSelector = createFeatureSelector<AppState, AuthState>(AuthStateFeatureName);

export const selectAuth = (state: AppState) => {
    console.log(' app  state >>>  > > > > ', state);
    return state[AuthStateFeatureName];
};

export const isAuthenticatedSelector = createSelector(selectAuth, (state) => state.isAuthenticated);
export const isAuthenticationDeterminedSelector = createSelector(selectAuth, (state) => {
    console.log('  auth state --- ', state);
    return state.isAuthenticationDetermined;
});

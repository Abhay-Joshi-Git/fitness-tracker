import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState, AppStateFeatureName } from './state';

const appSelector = createFeatureSelector<AppState>(AppStateFeatureName);

export const themeSelector = createSelector(appSelector, state => state.theme);

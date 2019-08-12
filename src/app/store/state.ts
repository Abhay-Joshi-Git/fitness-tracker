export enum ThemeType {
    light = 'LIGHT',
    dark = 'DARK'
}

export interface AppState {
    theme: ThemeType
};

export const InitialAppState = {
    theme: ThemeType.light
}

export const AppStateFeatureName = 'app';

export interface State {
    [AppStateFeatureName]: AppState
}
import { Action } from '@ngrx/store';
import { ThemeType } from './state';

export enum AppActionType {
    SET_THEME = 'SET_THEME'
}

export class SetTheme implements Action {
    type = AppActionType.SET_THEME;

    constructor (public payload: ThemeType) {}
}

export type AppAction = SetTheme;

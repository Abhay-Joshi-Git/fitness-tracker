import { AppState, InitialAppState, State, AppStateFeatureName } from './state';
import { AppAction, AppActionType } from './actions';
import { ActionReducerMap } from '@ngrx/store';

export function AppReducer(state: AppState = InitialAppState, action: AppAction) {
    switch (action.type) {
        case AppActionType.SET_THEME:
            return {
                ...state,
                theme: action.payload
            }
        default:
            return state;
    }
}

export const AppReducers: ActionReducerMap<State> = {
    [AppStateFeatureName]: AppReducer
}

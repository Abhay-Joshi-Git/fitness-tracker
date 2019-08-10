import { Action } from '@ngrx/store';

export enum AuthActionType {
    SET_AUTHENTICATED = '[Auth] SET_AUTHENTICATED',
    SET_AUTHENTICATION_DETERMINED = '[Auth] SET_AUTHENTICATION_DETERMINED',
}

export class Authenticate implements Action {
    readonly type = AuthActionType.SET_AUTHENTICATED;
    constructor(public readonly value: boolean) {}
}

export class AuthenticationDetermined implements Action {
    readonly type = AuthActionType.SET_AUTHENTICATION_DETERMINED;
    constructor(public readonly value: boolean) {}
}

export type AuthAction = Authenticate | AuthenticationDetermined;

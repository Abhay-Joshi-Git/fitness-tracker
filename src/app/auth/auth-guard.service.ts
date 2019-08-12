import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state';
import { isAuthenticatedSelector } from './store/selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad {

  constructor(private store: Store<AppState>) { }

  canLoad(route: Route, segments: UrlSegment[]) {
    return this.store.select(isAuthenticatedSelector).pipe(
      take(1),
    )
  }
}

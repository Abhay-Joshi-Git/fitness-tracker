import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { AuthService } from './auth.service';
import { tap, take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state';
import { isAuthenticatedSelector } from './store/selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad {

  constructor(private authService: AuthService, private router: Router, private store: Store<AppState>) { }

  canLoad(route: Route, segments: UrlSegment[]) {
    return this.store.select(isAuthenticatedSelector).pipe(
      tap(val => console.log(' ---- ----- can load ', val)),
      take(1),
    )
  }
}

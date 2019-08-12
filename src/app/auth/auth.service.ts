import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { User } from './user.model';
import { Subscription, from } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from './store/state';
import { Authenticate, AuthenticationDetermined } from './store/actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStateSubscription: Subscription = Subscription.EMPTY;
  private registeredUsers: User[] = [];

  constructor(
    private readonly router: Router,
    private readonly fireAuth: AngularFireAuth,
    private readonly store: Store<AuthState>
  ) {}

  init() {
    this.initAuthStateChangeListener();
  }

  initAuthStateChangeListener() {
    this.authStateSubscription = this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new Authenticate(true));
        this.router.navigate(['/training']);
      } else {
        this.store.dispatch(new Authenticate(false));
        this.router.navigate(['/login']);
      }
      this.store.dispatch(new AuthenticationDetermined(true));
    });
  }

  registerUser(data: { email: string; password: string }) {
    const { email, password } = data;
    this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/login']);
      });
  }

  login(email: string, password: string) {
    return from(this.fireAuth.auth.signInWithEmailAndPassword(email, password));
  }

  logout() {
    this.fireAuth.auth.signOut();
  }

  ngOnDestroy() {
    this.authStateSubscription.unsubscribe();
  }
}

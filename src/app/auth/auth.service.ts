import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { User } from './user.model';
import { Subject, BehaviorSubject, Subscription, from, combineLatest } from 'rxjs';
import { Router } from '@angular/router';
import { take, skipUntil, filter, map, sampleTime, skipWhile, tap } from 'rxjs/operators';
import { FirebaseNameOrConfigToken } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStateSubscription: Subscription = Subscription.EMPTY;
  private registeredUsers: User[] = [];
  private isAuth: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isFireAuthInitialize: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private router: Router, private fireAuth: AngularFireAuth) {
    this.initAuthStateChangeListener();
  }

  initAuthStateChangeListener() {
    this.authStateSubscription = this.fireAuth.authState.subscribe(user => {
      console.log(' authStateSubscription ', user);
      if (user) {
        this.isAuth.next(true);
        this.router.navigate(['/training']);
      } else {
        this.isAuth.next(false);
        this.router.navigate(['/login']);
      }
      this.isFireAuthInitialize.next(true);
    });
  }

  isAuthenticated() {
    return this.isAuth.asObservable();
  }

  isAuthenticationDetermined() {
    return this.isFireAuthInitialize.asObservable();
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

import { Injectable } from '@angular/core';
import { User } from './user.model';
import {v4 as uuid} from 'uuid';
// import { uuidv4 } from 'uuid/v4';
import { Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;
  private registeredUsers: User[] = [];
  private isAuth: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private router: Router) { }

  isAuthenticated() {
    return this.isAuth.asObservable();
  }

  registerUser(data: { email: string; password: string }) {
    const { email, password } = data;
    this.registeredUsers.push({
      email,
      password,
      id: uuid()
    });
    console.table(' users ', this.registeredUsers);
    this.router.navigate(['/login']);
  }

  login(email: string, password: string) {
    // const user = this.registeredUsers.find((u: User) => u.email === email && u.password === password);
    // if (user) {
      this.isAuth.next(true);
      this.router.navigate(['/training']);
    // }
  }

  logout() {
    this.isAuth.next(false);
    this.router.navigate(['/login']);
  }
}

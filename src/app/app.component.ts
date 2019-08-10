import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from './store/state';
import { isAuthenticationDeterminedSelector } from './auth/store/selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fitness-tracker';
  isAuthDetermined$: Observable<boolean>;

  constructor (
    private readonly authService: AuthService,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit() {
    this.isAuthDetermined$ = this.store.select(isAuthenticationDeterminedSelector);
  }

}

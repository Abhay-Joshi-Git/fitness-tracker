import { Component, OnInit, HostBinding } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState, ThemeType } from './store/state';
import { isAuthenticationDeterminedSelector } from './auth/store/selectors';
import { Observable } from 'rxjs';
import { themeSelector } from './store/selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fitness-tracker';
  isAuthDetermined$: Observable<boolean>;
  isDarkTheme$: Observable<boolean>;

  constructor (
    private readonly authService: AuthService,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit() {
    this.authService.init();
    this.isAuthDetermined$ = this.store.select(isAuthenticationDeterminedSelector);
    this.isDarkTheme$ = this.store.select(themeSelector).pipe(
      map((theme: ThemeType) => {
        return ThemeType.dark === theme;
      })
    );
  }



}

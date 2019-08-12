import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, ThemeType } from 'src/app/store/state';
import { isAuthenticatedSelector } from 'src/app/auth/store/selectors';
import { themeSelector } from 'src/app/store/selectors';
import { SetTheme } from 'src/app/store/actions';
import { MatSlideToggleChange } from '@angular/material/slide-toggle/typings/slide-toggle';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {
  isAuth$: Observable<boolean>;
  theme$: Observable<ThemeType>;
  darkThemeType = ThemeType.dark;
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private authService: AuthService, private store: Store<AppState>) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(isAuthenticatedSelector);
    this.theme$ = this.store.select(themeSelector);
  }

  toggleSidenav() {
    this.sidenavToggle.emit();
  }

  logout() {
    this.authService.logout();
  }

  themeToggle(event: MatSlideToggleChange) {
    const selectedTheme = event.checked ? ThemeType.dark : ThemeType.light;
    this.store.dispatch(new SetTheme(selectedTheme));
  }
}

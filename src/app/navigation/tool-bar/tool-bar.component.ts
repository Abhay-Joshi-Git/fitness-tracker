import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { isAuthenticatedSelector } from 'src/app/auth/store/selectors';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {
  isAuth$: Observable<boolean>;
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private authService: AuthService, private store: Store<AppState>) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(isAuthenticatedSelector);
  }

  toggleSidenav() {
    this.sidenavToggle.emit();
  }

  logout() {
    this.authService.logout();
  }

}

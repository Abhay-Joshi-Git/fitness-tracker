import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { isAuthenticatedSelector } from 'src/app/auth/store/selectors';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  isAuth$: Observable<boolean>;
  @Output() sidenavClose = new EventEmitter<void>();

  constructor(private authService: AuthService, private store: Store<AppState>) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(isAuthenticatedSelector);
  }

  closeSidenav() {
    this.sidenavClose.emit();
  }

  logout() {
    this.authService.logout();
  }

}

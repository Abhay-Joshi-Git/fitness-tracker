import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  private authSubscription: Subscription;
  private isAuth = false;
  @Output() sidenavClose = new EventEmitter<void>();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.isAuthenticated().subscribe(v => {
      this.isAuth = v;
    });
  }

  closeSidenav() {
    this.sidenavClose.emit();
  }

  logout() {
    this.authService.logout();
  }

}

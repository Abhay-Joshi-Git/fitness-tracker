import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UiModule } from '../ui/ui.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { StoreModule } from '@ngrx/store';
import { AuthStateFeatureName, InitialAuthState } from './store/state';
import { authReducer } from './store/reducer';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    AngularFireAuthModule,
    AuthRoutingModule,
    StoreModule.forFeature(AuthStateFeatureName, authReducer)
  ],
  exports: [
    SignupComponent,
    LoginComponent,
  ]
})
export class AuthModule {}

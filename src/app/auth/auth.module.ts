import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UiModule } from '../ui/ui.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SharedModule } from '../shared/shared.module';

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
  ],
  exports: [
    SignupComponent,
    LoginComponent,
  ]
})
export class AuthModule { }

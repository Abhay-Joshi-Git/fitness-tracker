import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements AfterViewInit {
  @ViewChild('signupForm', { read: NgForm, static: false }) signupForm!: NgForm;
  constructor(private authService: AuthService) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.signupForm.form.setValue({
        useremail: 'a@a.com',
        password: '123456',
        birthdate: new Date('11/12/1990'),
        terms: true
      });
    }, 0);
  }

  onSubmit(f: NgForm) {
    console.log('submitting form..', f.value);
    if (f.valid) {
      this.authService.registerUser({
        email: f.value.useremail,
        password: f.value.password
      });
    }
  }

}

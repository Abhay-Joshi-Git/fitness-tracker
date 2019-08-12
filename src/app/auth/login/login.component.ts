import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  formError: string | null = null;

  constructor(private readonly fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['a@a.com', Validators.required],
      password: ['123456', Validators.required]
    });
  }

  onSubmit() {
    this.loading = true;
    this.formError = null;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe(null, (error) => {
          this.formError = error.message
        });
    }
  }

}

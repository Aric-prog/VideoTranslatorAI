import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Errors, UserService } from '../core';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  authType: string = '';
  title: string = '';
  errors: Errors = { errors: {} };
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(route => {
      // Gets last string of the url
      this.authType = route[route.length - 1].path;
      this.title = (this.authType === 'login') ? 'Log in' : 'Sign up';
    })
  }
  submit() {
    const creds = this.authForm.value;
    this.userService
      .attemptAuth(this.authType, creds)
      .subscribe({
        next: data => this.router.navigateByUrl('/'),
        error: err => {
          this.errors = err;
          this.isSubmitting = false;
        }
      })
  }
}

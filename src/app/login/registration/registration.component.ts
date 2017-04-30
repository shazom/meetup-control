import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  private loginService: LoginService;
  public formRegistration: FormGroup;
  private snackBar: MdSnackBar;
  private errorMessage: string;


  constructor(loginService: LoginService, snackBar: MdSnackBar) {
    this.loginService = loginService;
    this.snackBar = snackBar;
  }

  ngOnInit() {
    this.formRegistration = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  register() {
    if (this.formRegistration.valid) {
      this.loginService.registration(this.formRegistration.value);
    } else {
      this.errorMessage = this.getErrorMessage();
      this.snackBar.open(this.errorMessage, 'OK', {
        duration: 2000,
      });
    }
  }

  getErrorMessage(): string {
    if (this.formRegistration.get('name').errors) {
      if (this.formRegistration.get('name').errors.required) {
        return 'Name is Required';
      }
    } else if (this.formRegistration.get('email').errors) {
      if (this.formRegistration.get('email').errors.required) {
        return 'Email is Required';
      }else if (this.formRegistration.get('email').errors.email) {
        return 'Email is Not Valid';
      }
    } else if (this.formRegistration.get('password').errors) {
      if (this.formRegistration.get('password').errors.required) {
        return 'Password is Required';
      }
    }
    return '';
  }

}
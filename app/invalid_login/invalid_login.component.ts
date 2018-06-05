import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './invalid_login.component.html'
})
export class Invalid_LoginComponent{
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  login() {
    this.auth.login(this.credentials).subscribe(() => {
      console.log('SUCCESSSSS');
      this.router.navigateByUrl('/profile');
      
    }, (err) => {
      console.log('ERRORRR');
      this.router.navigateByUrl('/invalid_login');
      //console.error(err);
    }); 
  }
}

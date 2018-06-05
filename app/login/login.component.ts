import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload, UserDetails } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  details: UserDetails;
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  login() {
    this.auth.login(this.credentials).subscribe(() => {
      console.log('SUCCESSSSS');
      this.auth.profile().subscribe(user => {
        this.details = user;
        console.log('SUCCESSSSS 222');
        console.log('user.type '+user.type);
        if(user.type === 'ADMIN')
        {
          console.log('Inside Admin');  
          this.router.navigateByUrl('/admin');
        } else
        {
          if (user.type === 'HR')
          {
            console.log('Inside Hr');  
            this.router.navigateByUrl('/hr'); 
          }else
          {
           // /*
            console.log('Inside Candidate');  
            if(user.chkLogin ==='Y'){
              console.log('Inside ChkLogin true');  
              this.router.navigateByUrl('/candidateMF');  
            }
            else{
              console.log('Inside ChkLogin False');  
              this.router.navigateByUrl('/candidate'); 
              
              
            }
            //*/
           //this.router.navigateByUrl('/candidate'); 
          }
        }
      }, (err) => {
        console.log('ERRORRRRR 1111');  
        console.error(err);
      });
       
      //this.router.navigateByUrl('/profile');
      
    }, (err) => {
      console.log('ERRORRR');
      this.router.navigateByUrl('/invalid_login');
      //console.error(err);
    }); 
  }
}

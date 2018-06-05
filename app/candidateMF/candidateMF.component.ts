import { Component } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './candidateMF.component.html'
})
export class CandidateMFComponent {
  details: UserDetails;

  constructor(private auth: AuthenticationService, private router: Router) {}
  
  ngOnInit() {    
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
  }
  
 
}

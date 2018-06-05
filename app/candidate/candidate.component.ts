import { Component } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './candidate.component.html'
})
export class CandidateComponent {
  details: UserDetails;

  constructor(private auth: AuthenticationService, private router: Router) {}
  
  ngOnInit() {    
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
  }
  
  //Start Exam button
  onSelect(): void {
    console.log("In on select");
    
    this.router.navigateByUrl('/assessment');
  }
 
  
}

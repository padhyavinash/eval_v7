import { Component } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { AssessmentService } from '../assessment.service';


import {Subscription} from "rxjs";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html'  
})
export class TimerComponent {

  details: UserDetails;
  
  constructor(private auth: AuthenticationService,private assessmentService: AssessmentService) {}
  
  ngOnInit() {    
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
  }

  
  
  
}




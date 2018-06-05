import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { HrComponent } from './hr/hr.component';
import { CandidateComponent} from './candidate/candidate.component';
import { CandidateMFComponent} from './candidateMF/candidateMF.component';
import { LoginComponent } from './login/login.component';
import { Invalid_LoginComponent} from './invalid_login/invalid_login.component';
import { Hr_RegisterComponent } from './hr_register/hr_register.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { AssessmentComponent } from './assessment/assessment.component';
import { AssessmentService } from './assessment.service';
import { TimerComponent } from './timer/timer.component';
import { ResultComponent } from './result/result.component';
import { PieChartService } from './piechart.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GoogleChartsBaseService } from './googlechartbase.service';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'invalid_login', component: Invalid_LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'hr_register', component: Hr_RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'admin', component: AdminComponent},
  { path: 'hr', component: HrComponent},
  { path: 'candidate', component: CandidateComponent},
  { path: 'candidateMF', component: CandidateMFComponent},
  { path: 'assessment', component: AssessmentComponent},
  { path: 'timer', component: TimerComponent},
  { path: 'result', component: ResultComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    AdminComponent,
    HrComponent,
    CandidateComponent,
    CandidateMFComponent,
    LoginComponent,
    Invalid_LoginComponent,
    RegisterComponent,
    Hr_RegisterComponent,
    HomeComponent,
    AssessmentComponent,
    TimerComponent,
    ResultComponent,
    DashboardComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    AuthenticationService, 
    AuthGuardService,
    AssessmentService,
    PieChartService,
    GoogleChartsBaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

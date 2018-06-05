import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Http ,Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


/*
export interface UserResult {
  email: string;
  name?: string;
  tech?: string;
  category1?: number;
  category2?: number;
  category3?: number;
  finalResult?: number;
}
*/
@Injectable()
export class AssessmentService {

  //let base; 

  constructor(private http: HttpClient) {}
  

/*
  public saveRes(res?:UserResult) {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/insertRes',res,{headers:headers})
      //.map(res => res.json());
      .pipe(map(res => res.json()));}

 */ 

}
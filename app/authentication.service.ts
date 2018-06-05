import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  type: string;
  exp: number;
  iat: number;
  tech: string;
  org: string;
  pos:string;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
  type?: string;
  tech?: string;
  org?: string;
  chkLogin?:string;
  pos?:string;
}

export interface UserResult {
  email: string;
  name: string;
  tech: string;
  category1: number;
  category2: number;
  category3: number;
  finalResult: number;
  org: string;
  pos: string;
}


@Injectable()
export class AuthenticationService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post'|'get', type: 'login'|'register'|'profile'|'getQs'|'chkLogin', user?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post') {
      console.log('Inside REG 1 POST');
      base = this.http.post(`http://localhost:3000/api/${type}`, user);
    } else {
      base = this.http.get(`http://localhost:3000/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}`}} );
    }
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
    return request;
    }

    private req(method: 'post'|'get', type: 'getRes'|'insertRes', res?: UserResult): Observable<any> {
      let base;
  console.log('Inside REQ : 1');
      if (method === 'post') {
        console.log('Inside REQ POST : 2 - '+type);
        console.log('Inside REQ POST : 2 - '+res.finalResult);
        base = this.http.post(`http://localhost:3000/api/${type}`, res);
       //base = this.http.post(`http://localhost:3000/api/insertRes`, res);
        console.log('Inside REQ POST : 2 after - '+base.category1);
      } else {
        base = this.http.get(`http://localhost:3000/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}`}} );
      }
      const req = base.pipe(

        
        map((data: TokenResponse) => {
          if (data.token) {
            this.saveToken(data.token);
          }
          return data;
        })
      );
      return req;
      }

  public register(user: TokenPayload): Observable<any> {
    console.log('Inside REG 1 Auth');
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

  public getQs(user?: TokenPayload): Observable<any>{
    console.log('Inside Get qs - AUTH');
    return this.request('post', 'getQs', user);
    
  }

   public getRes(): Observable<any>{
     return this.req('get', 'getRes');
    
   }

   public saveRes(res: UserResult): Observable<any>{
     console.log('inside AUTH saveRes '+res.email);
     return this.req('post', 'insertRes', res);
    
   }

   public chkLogin(user: TokenPayload): Observable<any> {
    console.log('Inside ChkLogin False 2');  
    return this.request('post', 'chkLogin', user);
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }

  public cdlogout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    console.log('Inside cdLogout');
    this.router.navigateByUrl('/timer');
    
  }
}

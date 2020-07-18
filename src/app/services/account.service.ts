import { Injectable } from '@angular/core';
import {User} from "../model/model.user";
import {HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import {environment} from "../../environments/environment";

@Injectable()
export class AccountService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded',
    })
  };
  constructor(private http: HttpClient) { }


  createAccount(user:User){
   // return this.http.post(environment.API_URL+'/account/register',user)      .map(resp=>resp.json());

      const result = this.http
      .post(environment.API_URL+'/account/register', user)
      .map((response: Response) => response );
    return result;
  }
}

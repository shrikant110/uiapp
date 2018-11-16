import { Injectable } from '@angular/core';
import {User} from "../model/model.user";
import {Http} from "@angular/http";
import {environment} from "../../environments/environment";

@Injectable()
export class AccountService {
  constructor(public http: Http) { }

  createAccount(user:User){
    return this.http.post(environment.API_URL+'/account/register',user)
      .map(resp=>resp.json());
  }
}

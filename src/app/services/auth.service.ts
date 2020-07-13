import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {User} from "../model/model.user";
import 'rxjs/add/operator/map';
import {environment} from "../../environments/environment";
@Injectable()
export class AuthService {
  constructor(public http: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded',
    })
  };
  
  public logIn(data){
    
    const outData = {
      ...data,
      Password: btoa(data.UserName.toString() + data.Password.toString()),
  };
  return this.http.post(
      `${environment.API_URL}/account/login`,
      data,
  );
    
  } 

  


  logOut() {

    console.info("logOut---->under service"+environment.API_URL+"/logout");
    // remove user from local storage to log user out
    // /return this.http.post(environment.API_URL+"/logout",{},{withCredentials:true})
    //   .map((response: Response) => {
    //     localStorage.removeItem('currentUser');
    //   });
    return this.http.get(environment.API_URL+"/logout",{withCredentials: true})
    .map((response: Response) => {
        return response;
    });
  }
}

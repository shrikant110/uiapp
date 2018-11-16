import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,Response} from '@angular/http';
import {User} from "../model/model.user";
import 'rxjs/add/operator/map';
import {environment} from "../../environments/environment";

@Injectable()
export class DashboardService {

  constructor(public http: Http) { }

  
  getUserName() {
    return this.http.get(environment.API_URL+"/account/username",{withCredentials: true})
      .map((response: Response) => {
       
      });
  }

  getLogginUser() {
    return this.http.get(environment.API_URL+"/account/cusername",{withCredentials: true})
      .map((response: Response) => {
        
      });
  }
  
  
  getModules() {
    return this.http.get(environment.API_URL+"/dashboard/getmodules",{withCredentials: true})
      .map((response: Response) => {
       
      });
  }


  

}

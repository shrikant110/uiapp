import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {environment} from "../../environments/environment";
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class DashboardService {

  constructor(public http: HttpClient) { }
  headers:Headers;
  options: RequestOptions;
  
  getUserName() {
      let options  = new RequestOptions({ withCredentials: true });
      this.http.get(environment.API_URL+"/account/username",{withCredentials: true}).subscribe(res => {
        console.info("getUserName"+res)
        return res;
      });  
  }

  getLogginUser() {
    

      this.http.get(environment.API_URL+"/account/cusername",{withCredentials: true}).subscribe(res => {
        console.info("getLogginUser"+res)
        return res;
      }); 
  }
  
  
  getModules() {
      this.http.get(environment.API_URL+"/dashboard/getmodules",{withCredentials: true}).subscribe(res => {
        console.info("getModules"+res)
        return res;
      }); 
  }


  

}

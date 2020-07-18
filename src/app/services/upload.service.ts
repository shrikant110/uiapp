import { Injectable } from '@angular/core';
import {User} from "../model/model.user";
import {Http} from "@angular/http";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class UploadService {
  constructor(public http: Http) { }

  createAccount(user:User){
    return this.http.post(environment.API_URL+'/account/register',user)
      .map(resp=>resp.json());
  }

  public upload(fileName,fileObject) {
    const formData: FormData = new FormData();
    if(fileObject==undefined){
      fileObject=new File([""], "filename1");
    }

    formData.append('image', fileObject);
    // formData.append('fileName',fileName);

    let result = this.http.post(environment.API_URL + 'vc/file/upload',formData).map((response => response));
    return result;
  }

}

import { Injectable } from '@angular/core';
import {User} from "../model/model.user";
import {Http} from "@angular/http";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class UploadService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded',
    })
  };
  constructor(private http: HttpClient) { }


  public upload(fileName,fileObject) {
    const formData: FormData = new FormData();
    if(fileObject==undefined){
      fileObject=new File([""], "filename1");
    }

    formData.append('image', fileObject);
    // formData.append('fileName',fileName);

    let result = this.http.post(environment.API_URL + 'vc/file/upload',formData).map((response: Response) => response );
    return result;
  }

  public mapping(saveObject) {
      let result = this.http.post(environment.API_URL + 'vc/set/mapping',saveObject).map((response: Response) => response );
    return result;
  }
}

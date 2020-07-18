import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../model/model.user";
import {Router} from "@angular/router";
import { DashboardService } from '../../services/dashboard.service';
import jsPDF from 'jspdf';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environment";
import { UploadService } from "../../services/upload.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  uploadNew:boolean=false;
  currentUser: User;

  constructor(public authService: AuthService, public router: Router,public dashboard:DashboardService,public http: HttpClient,public uploadserv:UploadService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
     this.dashboard.getModules() ;


      this.dashboard.getUserName() ;


      this.dashboard.getLogginUser();

  }

  getDashboardodule(){

    this.http.get(environment.API_URL+"/dashboard/getmodules",{withCredentials: true}).subscribe(res => {
      console.info("getModules"+res)

    });

  }

  ngOnInit() {
  }

// login out from the app
  logOut() {

    this.http.get(environment.API_URL+"/logout").subscribe(data => {
          console.log(data);
          console.info("logOut---->finish--->");
          localStorage.removeItem('currentUser');
          console.info("logOut---->finish");
          this.router.navigate(['login']);
    });


  }


  uploadNewShow(){
    this.uploadNew=true;
  }
  uploadNewHide(){
    this.uploadNew=false;
  }
  fileString:any='';
  fileObject:any=null;
  errorFlag:boolean = false;
  errorMsg:any="Please check the file uploaded !";
  fileUpload(event){
    this.fileString='';
    var files = event.target.files;
    if(files[0].size ==  0){
      this.fileObject = null;
      this.fileString ="";
      this.errorFlag=true;
    }else{
       this.fileObject = files[0];
       this.fileString = files[0].name;
    }
    console.log("uploaded file name -->"+this.fileString+" fileObject -->"+this.fileObject);
  }

  scannedData:any;
  uploadFile(){
    console.log(this.fileObject+" ==> "+this.fileString+" ==>");
    if(this.fileObject!=null && this.fileString!=''){
      this.uploadserv.upload(this.fileString,this.fileObject).subscribe((obj:any)=>{
        if(obj.ResponseCode==200){
          this.scannedData=obj.Data;
        }
      });
    }

    console.log(this.scannedData);
  }

}

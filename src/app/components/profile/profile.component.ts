import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../model/model.user";
import {Router} from "@angular/router";
import { DashboardService } from '../../services/dashboard.service';
import jsPDF from 'jspdf';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environment";
import { UploadService } from "../../services/upload.service";
import {saveDto} from "./saveDto"
import { element } from 'protractor';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  uploadNew:boolean=false;
  currentUser: User;
  savedata:saveDto = new saveDto();
  blankTable:boolean=true;
  loaderSec:boolean=false;
  pageLoader:boolean=false;
  searchSec:boolean=false;


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
    this.scannedData=[];
    this.showTable=false;
    this.savedata=new saveDto();
  }
  uploadNewHide(){
    this.uploadNew=false;
    this.scannedData=[];
  }
  fileString:any='';
  fileObject:any=null;
  errorFlag:boolean = false;
  // imgFlag:boolean=false;
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
    // this.imgFlag=true;
    console.log("uploaded file name -->"+this.fileString+" fileObject -->"+this.fileObject);

    document.getElementById('uploadimg').setAttribute( 'src', event.target.files[0] );

  }

  public imagePath;
  imgURL: any="../../../assets/images/card-placeholder.jpg";
  public message: string;

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }



  showTable:boolean=false;
  scannedData:any;
  scannedImage:any;
  scandataTmp:any=[];
  uploadFile(){
    console.log(this.fileObject+" ==> "+this.fileString+" ==>");
    if(this.fileObject!=null && this.fileString!=''){
      this.loaderSec=true;
      this.blankTable=false;
      this.uploadserv.upload(this.fileString,this.fileObject).subscribe((obj:any)=>{
        if(obj.ResponseCode=="200"){
          this.scannedData=obj.Data.scanMaster;
          // this.scannedImage=obj.Data.scanMaster.scanImage.pic;
          this.scannedImage = window.URL.createObjectURL(obj.Data.scanMaster.scanImage.pic);
          this.showTable=true;
          this.blankTable=false;
          this.loaderSec=false;
          this.savedata.scanId=obj.Data.id;
          this.scandataTmp=[];
            var tmp={"stageField": "f1","targetField": "","value": obj.Data.scanMaster.f1}
            this.scandataTmp.push(tmp);
            var tmp={"stageField": "f2","targetField": "","value": obj.Data.scanMaster.f2}
            this.scandataTmp.push(tmp);
            var tmp={"stageField": "f3","targetField": "","value": obj.Data.scanMaster.f3}
            this.scandataTmp.push(tmp);
            var tmp={"stageField": "f4","targetField": "","value": obj.Data.scanMaster.f4}
            this.scandataTmp.push(tmp);
            var tmp={"stageField": "f5","targetField": "","value": obj.Data.scanMaster.f5}
            this.scandataTmp.push(tmp);
            var tmp={"stageField": "f6","targetField": "","value": obj.Data.scanMaster.f6}
            this.scandataTmp.push(tmp);
            var tmp={"stageField": "f7","targetField": "","value": obj.Data.scanMaster.f7}
            this.scandataTmp.push(tmp);
            var tmp={"stageField": "f8","targetField": "","value": obj.Data.scanMaster.f8}
            this.scandataTmp.push(tmp);
            var tmp={"stageField": "f9","targetField": "","value": obj.Data.scanMaster.f9}
            this.scandataTmp.push(tmp);
            var tmp={"stageField": "f10","targetField": "","value": obj.Data.scanMaster.f10}
            this.scandataTmp.push(tmp);

            this.savedata.mapperObject=this.scandataTmp;
          console.log("this.scannedImage"+JSON.stringify(this.scannedImage))

          // for (var key in obj.Data.scanMaster) {
          //   let i=0
          //   if (obj.Data.scanMaster.hasOwnProperty(key)) {
          //     this.scandataTmp[i].stageField=key;
          //   }
          //   console.log("val - "+key);
          //  }

        }else{
          this.blankTable=true;
          this.loaderSec=false;
        }
      });
    }


  }

  saveValue(val,stage){
    console.log("val-"+val+"stage-"+stage);
    this.savedata.mapperObject[this.savedata.mapperObject.findIndex(x=> x.stageField==stage)].value=val;
    console.log("new obj - "+JSON.stringify(this.savedata))
  }

  saveType(type,stage){
    console.log("val-"+type+"stage-"+stage);
    this.savedata.mapperObject[this.savedata.mapperObject.findIndex(x=> x.stageField==stage)].targetField=type;
    console.log("new obj - "+JSON.stringify(this.savedata))
  }

  saveAll(){
    this.pageLoader=true;
    this.uploadserv.mapping(this.savedata).subscribe((obj:any)=>{
      if(obj.ResponseCode=="200"){
        this.uploadNew=false;
        this.scannedData=[];
        this.pageLoader=false;
      }else{
        this.pageLoader=false;
      }
    })
  }

  searchVal:any;

  getSearchValue(value,event){
    this.searchVal=value;
    console.log("search val - "+this.searchVal);
  }
fetchedData:any=[];
  searchData(){
    this.pageLoader=true;
    this.uploadserv.records(this.searchVal).subscribe((obj:any)=>{
      if(obj.ResponseCode==200){
        this.fetchedData=obj.Data;
        this.pageLoader=false;
        this.searchSec=true;
      }else{
        this.pageLoader=false;
      }
    })
  }





}

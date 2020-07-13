import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../model/model.user";
import {Router} from "@angular/router";
import { DashboardService } from '../../services/dashboard.service';
import jsPDF from 'jspdf';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environment";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  currentUser: User;
  constructor(public authService: AuthService, public router: Router,public dashboard:DashboardService,public http: HttpClient) {
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
  
}
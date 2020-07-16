import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {User} from "../../model/model.user";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  user: User=new User();
  errorMessage:string;
  constructor(private authService :AuthService, private router: Router) { }
  ngOnInit() {

  }

  login(){
    const loginModel = {
      UserName: this.user.UserName,
      Password: this.user.PassCode,
      'remember-me': true,
     };
     this.router.navigateByUrl('/profile');
    // this.authService.logIn(loginModel)
    //   .subscribe(data=>{
    //       console.info("I am here ====>"+JSON.stringify(data));
    //       localStorage.setItem("currentUser",JSON.stringify(data));
    //       this.router.navigate(['/profile']);
    //     },err=>{
    //       this.errorMessage="error :  Username or password is incorrect";
    //     }
    //   )
  }
}

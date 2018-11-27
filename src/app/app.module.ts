import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from "./services/auth.service";
import { DashboardService } from "./services/dashboard.service";
import { HttpModule} from "@angular/http";
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccountService} from "./services/account.service";
import { ProfileComponent } from './components/profile/profile.component';
import { routing} from "./app.routing";
import { FacebookModule} from "ngx-facebook";
import { UrlPermission} from "./urlPermission/url.permission";
import { AmChartsModule } from "@amcharts/amcharts3-angular";
import { AmChartsComponent } from './am-charts/am-charts.component';
import { HttpRequestInterceptor} from './HttpRequestInterceptor';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AmChartsComponent,
  ],
  imports: [
    BrowserModule,HttpModule,HttpClientModule,FormsModule,routing, AmChartsModule,FacebookModule.forRoot(),
  ],
  providers: [AuthService,AccountService,DashboardService,UrlPermission 
  ,{ provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Avova';
  static API_URL="http://54.254.162.151:8080";
  dateTime=new Date();
}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  helloText = '';

  constructor( private httpClient : HttpClient){

  }

  logout(){
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("username");
    window.location.reload();
  }
  
  
}

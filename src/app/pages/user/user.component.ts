import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  helloText = '';

  constructor(private oauthService: OAuthService, private httpClient : HttpClient){

  }

  logout(){
    this.oauthService.logOut();
  }
  
  getText(){
    this.httpClient.get<{m: string}>('http://localhost:8080/dados',{//o param deve ser igual ao q esta no back
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`
      }
    }).subscribe(result => {
      this.helloText = result.m;
    })
  }
}

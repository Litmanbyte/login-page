import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private keycloak: KeycloakService) {}

  async init() {
    await this.keycloak.init({
      config: {
        url: 'http://localhost:9090',
        realm: 'Gerenciamento-laudos',
        clientId: 'laudos'
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false,
        redirectUri: 'http://localhost:4200/user' // Defina para onde o usuário será redirecionado
      }
    });
  }
}

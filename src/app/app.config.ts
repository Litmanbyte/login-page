import { APP_INITIALIZER, ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { AuthConfig, OAuthService, provideOAuthClient } from 'angular-oauth2-oidc';

export const authCodeFlowConfig : AuthConfig = {
  issuer: 'http://localhost:9090/realms/Gerenciamento-laudos',
  tokenEndpoint: 'http://localhost:9090/realms/Gerenciamento-laudos/protocol/openid-connect/token',
  redirectUri: window.location.origin,
  clientId: 'laudos',
  responseType: 'code',
  scope: 'openid profile',
}

export const appInitializer = () => {
  const oauthService = inject(OAuthService);
  
  return () =>
    oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (!oauthService.hasValidAccessToken()) {
        oauthService.initLoginFlow(); // Force redirect to Keycloak
      }
    });
};

function initializeOAuth(oauthService: OAuthService): Promise<void>{
  return new Promise((resolve) =>{
    oauthService.configure(authCodeFlowConfig);
    oauthService.setupAutomaticSilentRefresh();
    oauthService.loadDiscoveryDocumentAndLogin().then(() => resolve());
  })
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideToastr(),
    provideHttpClient(),
    provideOAuthClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: (oauthService : OAuthService) => {
        return () => {
          initializeOAuth(oauthService);
        }
      },
      multi: true,
      deps: [
        OAuthService
      ]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true
    },
    
    
    provideRouter(routes),provideHttpClient(withFetch())]
};

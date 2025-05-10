import { Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: 'user', component: UserComponent,}, 
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: 'login' }
];

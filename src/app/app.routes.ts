import { Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { AuthGuard } from './services/auth-guard.service';

export const routes: Routes = [
  { path: 'user', component: UserComponent,}, // canActivate: [AuthGuard]
  { path: '**', redirectTo: 'user' }
];

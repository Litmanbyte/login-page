import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AvaliarFilmeComponent } from './components/avaliar-filme/avaliar-filme.component';
import { ListaFilmesComponent } from './pages/lista-filmes/lista-filmes.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'avaliar-filme', component: AvaliarFilmeComponent },
  { path: 'listagem', component: ListaFilmesComponent},
  { path: '**', redirectTo: 'login' }
];

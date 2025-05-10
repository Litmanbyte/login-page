import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { filmeAvaliado } from '../types/filme-avaliado.type';
import { Movie } from '../types/movie.type';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private filmesAvaliados: filmeAvaliado[] = [];
  private filmesAvaliadosSubject = new BehaviorSubject<filmeAvaliado[]>([]);

  constructor(private http: HttpClient) {}

  getFilmesDisponiveis(): Observable<Movie[]> {
  return this.http.get<any>('assets/mocks/movies.json').pipe(
    map(response => response.results), // Extrai apenas o array de filmes
    catchError(error => {
      console.error('Erro ao carregar filmes:', error);
      return of([]);
    })
  );
}

  avaliarFilme(filme: Movie, nota: number): void {
    const filmeAvaliado: filmeAvaliado = {
      ...filme,
      notaUsuario: nota,
      avaliadoEm: new Date().toISOString()
    };
    
    this.filmesAvaliados = [...this.filmesAvaliados, filmeAvaliado];
    this.filmesAvaliadosSubject.next(this.filmesAvaliados);
  }

  getFilmesAvaliados(): Observable<filmeAvaliado[]> {
    return this.filmesAvaliadosSubject.asObservable();
  }
}
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
      original_title: filme.original_title,
      release_date: filme.release_date,
      original_language: filme.original_language,      
      vote_average: filme.vote_average,
      overview: filme.overview,
      notaUsuario: nota,
      avaliadoEm: new Date().toISOString()
    };
    
    this.filmesAvaliados = [...this.filmesAvaliados, filmeAvaliado];
    this.filmesAvaliadosSubject.next(this.filmesAvaliados);
  }

  private idiomasMap: {[key: string]: string} = {
    'en': 'Inglês',
    'fr': 'Francês',
    'de': 'Alemão',
    'es': 'Espanhol',
    'pt': 'Português',
    'it': 'Italiano',
    'ru': 'Russo',
    'ja': 'Japonês',
    'zh': 'Chinês',
    'ko': 'Coreano'
  };
  getNomeIdioma(codigo: string): string {
    return this.idiomasMap[codigo] || codigo; 
  }

  getFilmesAvaliados(): Observable<filmeAvaliado[]> {
    return this.filmesAvaliadosSubject.asObservable().pipe(
      map(filmes => filmes.map(filme => ({
        ...filme,
        original_language: this.getNomeIdioma(filme.original_language)
      })))
    );
  }
}
import { Component, OnInit, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Observable } from 'rxjs';
import { Movie } from '../../types/movie.type';

@Component({
  selector: 'app-avaliar-filme',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './avaliar-filme.component.html',
  styleUrls: ['./avaliar-filme.component.scss'],
})
export class AvaliarFilmeComponent implements OnInit {
  filmesDisponiveis$: Observable<Movie[]>;
  filmeSelecionado?: Movie;
  nota: number = 3;

  constructor(
    private filmeService: MovieService,
    private dialogRef: MatDialogRef<AvaliarFilmeComponent>
  ) {
    this.filmesDisponiveis$ = this.filmeService.getFilmesDisponiveis();
  }

  ngOnInit(): void {
    // Lógica de inicialização se necessário
    this.filmesDisponiveis$.subscribe(filmes => {
      console.log('Filmes carregados:', filmes);
    });
  }

  avaliar(): void {
    if (this.filmeSelecionado) {
      this.filmeService.avaliarFilme(this.filmeSelecionado, this.nota);
      this.dialogRef.close();
    }
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { AvaliarFilmeComponent } from '../../components/avaliar-filme/avaliar-filme.component';
import { Observable } from 'rxjs';
import { filmeAvaliado } from '../../types/filme-avaliado.type';

@Component({
  selector: 'app-lista-filmes',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    DatePipe
  ],
  templateUrl: './lista-filmes.component.html',
  styleUrls: ['./lista-filmes.component.scss']
})
export class ListaFilmesComponent {
  // First declare the property
  filmesAvaliados$!: Observable<filmeAvaliado[]>;

  // Then the constructor
  constructor(
    private filmeService: MovieService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.filmesAvaliados$ = this.filmeService.getFilmesAvaliados();
  }

  // Then other methods
  abrirModalAvaliacao(): void {
    this.dialog.open(AvaliarFilmeComponent, {
      width: '500px'
    });
  }
}
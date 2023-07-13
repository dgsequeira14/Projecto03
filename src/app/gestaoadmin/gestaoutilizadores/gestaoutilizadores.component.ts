import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServloginService } from 'src/app/servlogin/servlogin.service';
import { Utilizador } from 'src/app/shared/utilizador.model';

@Component({
  selector: 'app-gestaoutilizadores',
  templateUrl: './gestaoutilizadores.component.html',
  styleUrls: ['./gestaoutilizadores.component.css'],
})
export class GestaoutilizadoresComponent {
  listaUtilizadores: Utilizador[] = [];
  displayedColumns: string[] = [
    'nome',
    'email',
    'morada',
    'codigoPostal',
    'pais',
    'perfil',
    'estado',
  ];
  dataSource = new MatTableDataSource<Utilizador>(this.listaUtilizadores);

  constructor(private servutilizadores: ServloginService, private location: Location) {}

  ngOnInit() {
    this.mostrarUtilizadores();
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarUtilizadores() {
    this.servutilizadores.listarUtilizadores().subscribe(
      (utilizadores) => {
        this.listaUtilizadores = utilizadores;
        this.dataSource.data = this.listaUtilizadores;
      },
      (erro) => {
        console.error('Erro na leitura de utilizadores:', erro);
      }
    );
  }

  voltarPaginaAnterior() {
    this.location.back();
  }
}

import { Component } from '@angular/core';
import { ServloginService } from '../../servlogin/servlogin.service';
import { Utilizador } from '../../shared/utilizador.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-perfilutilizador',
  templateUrl: './perfilutilizador.component.html',
  styleUrls: ['./perfilutilizador.component.css'],
})
export class PerfilutilizadorComponent {
  utilizadorLoggadoID!: number | null;
  utilizador!: Utilizador;
  password: boolean = false;
  mostraFormAlterar: boolean = false;

  constructor(
    private servutilizador: ServloginService,
    private router: Router,
    private route: ActivatedRoute, private location: Location
  ) {}

  ngOnInit() {
    this.mostrarPerfil();
  }

  mostrarPerfil() {
    const userID = localStorage.getItem('userId');

    this.utilizadorLoggadoID = parseInt(userID ?? '0');

    if (this.utilizadorLoggadoID > 0) {
      this.servutilizador
        .lerUtilizadorID(this.utilizadorLoggadoID)
        .subscribe((utilizador: Utilizador) => {
          this.utilizador = utilizador;
        });
    }
  }

  mostrarPassword() {
    this.password = !this.password;
  }

  abrirFormAlterar(utilizador: Utilizador) {
    this.router.navigate(['alterarinformacoes'], { relativeTo: this.route });
    this.mostraFormAlterar = true;
  }

  esconderFormAlterar() {
    this.mostraFormAlterar = false;
  }

  voltarPaginaAnterior() {
    this.esconderFormAlterar();
    this.location.back();
  }
}

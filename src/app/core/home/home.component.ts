import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ServprodutosService } from 'src/app/servprodutos/servprodutos.service';
import { Produto } from 'src/app/shared/produto.model';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  imagens = [
    { nome: 'slider1.jpg', legenda: 'slider1' },
    { nome: 'slider2.jpg', legenda: 'slider2' },
    { nome: 'slider3.jpg', legenda: 'slider3' },
  ];

  listaProdutos: Produto[] = [];
  destaque!: boolean;

  /* RWD VARIABLES */

  coluna = 4;
  alturaLinha = '450px';

  constructor(
    private servprodutos: ServprodutosService,
    private rwd: BreakpointObserver
  ) {}

  ngOnInit() {
    this.mostrarProdutos();

    this.rwd
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe((resultado) => {
        this.coluna = 4;
        this.alturaLinha = '450px';
        const breakpoint = resultado.breakpoints;

        if (breakpoint[Breakpoints.HandsetPortrait]) {
          this.coluna = 2;
          this.alturaLinha = '200px';
        } else if (breakpoint[Breakpoints.TabletPortrait]) {
          this.coluna = 3;
          this.alturaLinha = '225px';
        }
      });
  }

  mostrarProdutos() {
    this.servprodutos.listarTodosProdutos().subscribe({
      next: (produtos) => {
        this.listaProdutos = produtos;
      },
      error: (erro) => console.error('Error fetching produtos:', erro),
    });
  }
}

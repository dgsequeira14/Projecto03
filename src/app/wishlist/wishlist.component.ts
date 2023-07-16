import { Component } from '@angular/core';
import { Produto } from '../shared/produto.model';
import { ServprodutosService } from '../servprodutos/servprodutos.service';
import { Location } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
  coluna = 3;
  alturaLinha = '450px';

  constructor(
    private servprodutos: ServprodutosService,
    private location: Location,
    private rwd: BreakpointObserver
  ) {}

  /*
  * Neste componente as RWD não estão bem conseguidas por não conseguir alterar a largura de cada mat-grid-tile.
  */
  ngOnInit() {
    this.rwd
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe((resultado) => {
        this.coluna = 3;
        this.alturaLinha = "250px";
        const breakpoint = resultado.breakpoints;

        if (breakpoint[Breakpoints.HandsetPortrait]) {
          this.coluna = 1;
          this.alturaLinha = '200px';
        } 
      });
  }

  get listaProdutosWishlist(): Produto[] {
    return this.servprodutos.lerWishlistUtilizador();
  }

  removerWishlist(produto: Produto) {
    this.servprodutos.removerWishlist(produto);
  }

  voltarPaginaAnterior() {
    this.location.back();
  }
}

import { Component } from '@angular/core';
import { Produto } from '../shared/produto.model';
import { ServprodutosService } from '../servprodutos/servprodutos.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
  constructor(
    private servprodutos: ServprodutosService,
    private location: Location
  ) {}

  get listaProdutosWishlist(): Produto[] {
    return this.servprodutos.listaProdutosWishlist;
  }

  removerWishlist(produto: Produto) {
    this.servprodutos.removerWishlist(produto);
  }

  voltarPaginaAnterior() {
    this.location.back();
  }
}

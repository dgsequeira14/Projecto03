import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServprodutosService } from '../servprodutos/servprodutos.service';
import { Location } from '@angular/common';
import { Produto } from '../shared/produto.model';

@Component({
  selector: 'app-infoproduto',
  templateUrl: './infoproduto.component.html',
  styleUrls: ['./infoproduto.component.css'],
})
export class InfoprodutoComponent implements OnInit {
  id!: number;
  produto!: Produto;

  constructor(
    private rotaAtiva: ActivatedRoute,
    private servproduto: ServprodutosService,
    private location: Location
  ) {}

  ngOnInit() {
    this.rotaAtiva.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
      this.servproduto.produtoInfo(this.id).subscribe((produto) => {
        this.produto = produto;
      });
    });
  }

  adicionarCarrinhoCompras(produto: Produto) {
    const isProdutoWishlist = this.servproduto.isProdutoWishlist(produto);

    this.servproduto.adicionarCarrinho(produto);

    if (isProdutoWishlist) {
      this.servproduto.removerWishlist(produto);
      alert('Produto removido da Wishlist!');
    }
  }

  voltarPaginaAnterior() {
    this.location.back();
  }
}

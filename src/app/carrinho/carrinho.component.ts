import { Component } from '@angular/core';
import { ServprodutosService } from '../servprodutos/servprodutos.service';
import { Location } from '@angular/common';
import { Produto } from '../shared/produto.model';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
})
export class CarrinhoComponent {
  listaProdutosCarrinho: Produto[] = [];
  displayedColumns: string[] = ['produto', 'marca', 'nome', 'preco', 'remover'];

  constructor(
    private servprodutos: ServprodutosService,
    private location: Location
  ) {}

  ngOnInit() {
    this.listaProdutosCarrinho = this.servprodutos.lerCarrinhoUtilizador();
  }

  removerCarrinho(produto: Produto) {
    this.servprodutos.removerCarrinho(produto);
    this.listaProdutosCarrinho = this.servprodutos.lerCarrinhoUtilizador();
    window.location.reload();
  }

  precoTotal() {
    return this.listaProdutosCarrinho.reduce(
      (total, produto) => total + Number(produto.preco),
      0
    );
  }

  voltarPaginaAnterior() {
    this.location.back();
  }
}

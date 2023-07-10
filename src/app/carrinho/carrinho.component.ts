import { Component } from '@angular/core';
import { ServprodutosService } from '../servprodutos/servprodutos.service';
import { Location } from '@angular/common';
import { Produto } from '../shared/produto.model';
import { MatTableModule } from '@angular/material/table';

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
    this.listaProdutosCarrinho = this.servprodutos.listaProdutosCarrinho;
  }

  removerCarrinho(produto: Produto) {
    this.servprodutos.removerCarrinho(produto);
    window.location.reload(); // Tive que implementar o method reload() porque não conseguia mostrar o carrinho de compras atualizado depois de remover um artigo sem fazer o refresh da página
    
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

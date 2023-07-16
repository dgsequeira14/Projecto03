import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FiltroComponent } from 'src/app/filtro/filtro.component';
import { ServprodutosService } from 'src/app/servprodutos/servprodutos.service';
import { Produto } from 'src/app/shared/produto.model';

@Component({
  selector: 'app-homem',
  templateUrl: './homem.component.html',
  styleUrls: ['./homem.component.css'],
})
export class HomemComponent {
  listaProdutos: Produto[] = [];
  totalProdutos: number = 0;
  registoInicial: number = 0;
  numRegPag: number = 6;
  hoveredProduto: any = null;
  tipo: string = '';
  cor: string = '';
  produtoFiltrado: Produto[] = [];
  estrelasSelecionadas: number[] = [];

  constructor(
    private servprodutos: ServprodutosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.lerTotalProdutos();
    this.mostrarProdutos();
  }

  lerTotalProdutos() {
    this.servprodutos
      .totalProdutos(this.registoInicial, this.numRegPag)
      .subscribe({
        next: (response) => {
          this.listaProdutos = response.body!;
          this.totalProdutos = Number(response.headers.get('x-total-count'));
        },
        error: (erro) => console.error('Error reading produtos:', erro),
      });
  }

  mostrarProdutos() {
    this.servprodutos.listarTodosProdutos().subscribe({
      next: (produtos) => {
        this.listaProdutos = produtos;
        this.produtoFiltrado = produtos;
      },
      error: (erro) => console.error('Error fetching produtos:', erro),
    });
  }

  isHovered(produto: any): boolean {
    return this.hoveredProduto === produto;
  }

  imgSecundaria(produto: any): void {
    this.hoveredProduto = produto;
  }

  imgPrincipal(): void {
    this.hoveredProduto = null;
  }

  verMais() {
    this.numRegPag += 6;
  }

  verMenos() {
    this.numRegPag = 6;
  }

  mostrarInfoProduto(id: number): void {
    this.router.navigate(['/produto', id]);
  }

  filtrarProduto(filtro: any) {
    const { tipo, cor } = filtro;

    this.produtoFiltrado = this.listaProdutos.filter((produto: any) => {
      const tipoSelecionado =
        tipo.length === 0 || tipo.includes(produto.tipo_de_produto);
      const corSelecionada = cor.length === 0 || cor.includes(produto.cor);

      return tipoSelecionado && corSelecionada;
    });

    this.totalProdutos = this.produtoFiltrado.length;
  }

  estrelaSelecionada(produto: Produto, index: number) {
    if (this.estrelasSelecionadas.includes(index)) {
      this.estrelasSelecionadas = this.estrelasSelecionadas.filter(
        (x) => x !== index
      );
      this.servprodutos.removerWishlist(produto);
      alert('Produto removido da Wishlist!');
    } else {
      this.estrelasSelecionadas.push(index);
      this.servprodutos.adicionarWishlist(produto);
    }
  }

  adicionarCarrinhoCompras(produto: Produto) {
    const isProdutoWishlist = this.servprodutos.isProdutoWishlist(produto);

    this.servprodutos.adicionarCarrinho(produto);

    if (isProdutoWishlist) {
      this.servprodutos.removerWishlist(produto);
      alert('Produto removido da Wishlist!');
    }
  }
}

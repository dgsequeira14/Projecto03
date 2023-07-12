import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Produto } from '../shared/produto.model';

@Injectable({
  providedIn: 'root',
})
export class ServprodutosService {
  private urlAPI = 'http://localhost:3000';
  listaProdutosWishlist: Produto[] = [];
  listaProdutosCarrinho: Produto[] = [];

  constructor(private http: HttpClient) {
    const listaWishlist = localStorage.getItem('wishlist');
    if (listaWishlist) {
      this.listaProdutosWishlist = JSON.parse(listaWishlist);
    }

    const listaCarrinho = localStorage.getItem('carrinho');
    if (listaCarrinho) {
      this.listaProdutosCarrinho = JSON.parse(listaCarrinho);
    }
  }

  private processaErro(erro: HttpErrorResponse) {
    let mensagem = '';
    if (erro.status !== 404) {
      mensagem = 'Não foi possível estabelecer ligação com a API!';
    } else {
      mensagem = 'Ocorreu um erro.';
    }
    const error = new Error(mensagem);
    return throwError(() => error);
  }

  listarTodosProdutos(): Observable<Produto[]> {
    return this.http
      .get<Produto[]>(`${this.urlAPI}/produtos`)
      .pipe(catchError(this.processaErro));
  }

  totalProdutos(
    inicio: number,
    regPorPag: number
  ): Observable<HttpResponse<Produto[]>> {
    return this.http
      .get<Produto[]>(
        `${this.urlAPI}/produtos?_start=${inicio}&_limit=${regPorPag}`,
        { observe: 'response' }
      )
      .pipe(catchError(this.processaErro));
  }

  produtoInfo(id: number): Observable<Produto> {
    return this.http
      .get<Produto>(`${this.urlAPI}/produtos/${id}`)
      .pipe(catchError(this.processaErro));
  }

  private guardarWishlist() {
    localStorage.setItem(
      'wishlist',
      JSON.stringify(this.listaProdutosWishlist)
    );
  }

  adicionarWishlist(produto: Produto) {
    this.listaProdutosWishlist.push(produto);
    this.guardarWishlist();
  }

  removerWishlist(produto: any) {
    const indexProduto = this.listaProdutosWishlist.findIndex(
      (produto) => produto.id === produto.id
    );
    if (indexProduto !== -1) {
      this.listaProdutosWishlist.splice(indexProduto, 1);
      this.guardarWishlist();
    }
  }

  private guardarCarrinho() {
    localStorage.setItem(
      'carrinho',
      JSON.stringify(this.listaProdutosCarrinho)
    );
  }

  adicionarCarrinho(produto: Produto) {
    this.listaProdutosCarrinho.push(produto);
    alert('Produto adicionado ao Carrinho de Compras!');
    this.guardarCarrinho();
  }

  removerCarrinho(produto: Produto) {
    const indexProduto = this.listaProdutosCarrinho.findIndex(
      (produto) => produto.id === produto.id
    );
    if (indexProduto !== -1) {
      this.listaProdutosCarrinho.splice(indexProduto, 1);
    }
    this.guardarCarrinho();
    alert('Produto removido do Carrinho de Compras!');
  }

  inserirProduto(produto: Produto) : Observable<Produto> {
    return this.http.post<Produto>(this.urlAPI, produto)
  }
}

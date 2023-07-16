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
  private utilizadorID: number | null = null;
  private wishlistUtilizador: { [userId: number]: Produto[] } = {};
  private carrinhoUtilizador: { [userId: number]: Produto[] } = {};

  constructor(private http: HttpClient) {
    const utilizadorIDStorage = localStorage.getItem('userId');
    if (utilizadorIDStorage) {
      this.utilizadorID = parseInt(utilizadorIDStorage, 10);
    }
    const wishlistUtilizadorStorage =
      localStorage.getItem('wishlistUtilizador');
    if (wishlistUtilizadorStorage) {
      this.wishlistUtilizador = JSON.parse(wishlistUtilizadorStorage);
    }
    const carrinhoUtilizadorStorage =
      localStorage.getItem('carrinhoUtilizador');
    if (carrinhoUtilizadorStorage) {
      this.carrinhoUtilizador = JSON.parse(carrinhoUtilizadorStorage);
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

  guardarUtilizadorID() {
    if (this.utilizadorID !== null) {
      localStorage.setItem('userId', this.utilizadorID.toString());
    }
  }

  lerUtilizadorID(): number {
    const utilizadorID = localStorage.getItem('userId');
    return utilizadorID ? parseInt(utilizadorID, 10) : -1;
  }

  lerWishlistUtilizador(): Produto[] {
    const utilizadorID = this.lerUtilizadorID();
    return this.wishlistUtilizador[utilizadorID] || [];
  }

  private guardarWishlist() {
    localStorage.setItem(
      'wishlistUtilizador',
      JSON.stringify(this.wishlistUtilizador)
    );
  }

  isProdutoWishlist(produto: Produto): boolean {
    const userId = this.lerUtilizadorID();
    const wishlist = this.lerWishlistUtilizador();
    return wishlist.some((p) => p.id === produto.id);
  }

  adicionarWishlist(produto: Produto) {
    const utilizadorID = this.lerUtilizadorID();
    if (!this.wishlistUtilizador[utilizadorID]) {
      this.wishlistUtilizador[utilizadorID] = [];
    }
    this.wishlistUtilizador[utilizadorID].push(produto);
    this.guardarWishlist();
  }

  removerWishlist(produto: Produto) {
    const utilizadorID = this.lerUtilizadorID();
    const wishlist = this.wishlistUtilizador[utilizadorID] || [];
    const indexProduto = wishlist.findIndex((p) => p.id === produto.id);
    if (indexProduto !== -1) {
      wishlist.splice(indexProduto, 1);
      this.guardarWishlist();
    }
  }

  private guardarCarrinho() {
    localStorage.setItem(
      'carrinhoUtilizador',
      JSON.stringify(this.carrinhoUtilizador)
    );
  }

  lerCarrinhoUtilizador(): Produto[] {
    const utilizadorID = this.lerUtilizadorID();
    return this.carrinhoUtilizador[utilizadorID] || [];
  }

  adicionarCarrinho(produto: Produto) {
    const utilizadorID = this.lerUtilizadorID();
    if (!this.carrinhoUtilizador[utilizadorID]) {
      this.carrinhoUtilizador[utilizadorID] = [];
    }
    this.carrinhoUtilizador[utilizadorID].push(produto);
    alert('Produto adicionado ao carrinho!');
    this.guardarCarrinho();
  }

  removerCarrinho(produto: Produto) {
    const utilizadorID = this.lerUtilizadorID();
    const carrinho = this.carrinhoUtilizador[utilizadorID] || [];
    const indexProduto = carrinho.findIndex((p) => p.id === produto.id);
    if (indexProduto !== -1) {
      carrinho.splice(indexProduto, 1);
      this.guardarCarrinho();
    }
  }

  inserirProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${this.urlAPI}/produtos`, produto);
  }

  eliminarProduto(id: number): Observable<Produto> {
    return this.http.delete<any>(`${this.urlAPI}/produtos/${id}`);
  }

  pesquisarProduto(palavra: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(
      `${this.urlAPI}/produtos/?nome_like=${palavra}`
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Utilizador } from '../shared/utilizador.model';

@Injectable({
  providedIn: 'root',
})
export class ServloginService {
  private urlAPI = 'http://localhost:3000';
  private readonly loggedInKey = 'isLoggedIn';
  private readonly nomeUtilizadorKey = 'nomeUtilizador';
  private readonly perfilKey = 'perfilUtilizador';
  private estadoKey = 'estadoUtilizador';

  constructor(private http: HttpClient) {}

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

  listarUtilizadores(): Observable<Utilizador[]> {
    return this.http
      .get<Utilizador[]>(`${this.urlAPI}/utilizadores`)
      .pipe(catchError(this.processaErro));
  }

  validarCredenciais(email: string, password: string): Observable<any> {
    return this.listarUtilizadores().pipe(
      map((utilizadores: Utilizador[]) => {
        const utilizadorExistente = utilizadores.find(
          (utilizador: Utilizador) =>
            utilizador.email === email && utilizador.password === password
        );

        const utilizadorValidado = {
          isValid: utilizadorExistente !== undefined,
          userId: utilizadorExistente ? utilizadorExistente.id : null,
          nomeUtilizador: utilizadorExistente ? utilizadorExistente.nome : null,
          perfilUtilizador: utilizadorExistente
            ? utilizadorExistente.perfil
            : null,
          estadoUtilizador: utilizadorExistente
            ? utilizadorExistente.estado
            : null,
        };

        return utilizadorValidado;
      })
    );
  }

  setLoggedIn(value: boolean): void {
    localStorage.setItem(this.loggedInKey, value ? 'true' : 'false');
  }

  isLoggedIn(): boolean {
    const isLoggedInValue = localStorage.getItem(this.loggedInKey);
    return isLoggedInValue === 'true';
  }

  lerNomeUtilizador(): string | null {
    return localStorage.getItem(this.nomeUtilizadorKey);
  }

  lerPerfil(): string | null {
    return localStorage.getItem(this.perfilKey);
  }

  isAtivo(): boolean {
    const isUtilizadorAtivo = localStorage.getItem(this.estadoKey);
    if (isUtilizadorAtivo === 'ativo') {
      return true;
    }
    return false;
  }

  updateUtilizador(id: number, utilizador: Utilizador): Observable<Utilizador> {
    return this.http
      .patch<Utilizador>(`${this.urlAPI}/utilizadores/${id}`, utilizador)
      .pipe(catchError(this.processaErro));
  }

  inserirUtilizador(utilizador: Utilizador): Observable<Utilizador> {
    return this.http
      .post<Utilizador>(`${this.urlAPI}/utilizadores/`, utilizador)
      .pipe(catchError(this.processaErro));
  }

  lerUtilizadorID(id: number): Observable<Utilizador> {
    return this.http
      .get<Utilizador>(`${this.urlAPI}/utilizadores/${id}`)
      .pipe(catchError(this.processaErro));
  }
}

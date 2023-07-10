// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, catchError, throwError } from 'rxjs';
// import { Utilizador } from '../shared/utilizador.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class ServloginService {
//   private urlAPI = 'http://localhost:3000';

//   constructor(private http: HttpClient) {}

//   private processaErro(erro: HttpErrorResponse) {
//     let mensagem = '';
//     if (erro.status !== 404) {
//       mensagem = 'Não foi possível estabelecer ligação com a API!';
//     } else {
//       mensagem = 'Ocorreu um erro.';
//     }
//     const error = new Error(mensagem);
//     return throwError(() => error);
//   }

//   listarUtilizadores(): Observable<Utilizador[]> {
//     return this.http
//       .get<Utilizador[]>(`${this.urlAPI}/utilizadores`)
//       .pipe(catchError(this.processaErro));
//   }
// }

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

  validarLogin(email: string, password: string): Observable<boolean> {
    return this.listarUtilizadores().pipe(
      map((utilizadores: Utilizador[]) => {
        const user = utilizadores.find(
          (u) => u.email === email && u.password === password
        );
        return !!user; // Returns true if user is found, false otherwise
      })
    );
  }
}


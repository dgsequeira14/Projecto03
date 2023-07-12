import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { LoginmodalComponent } from 'src/app/loginmodal/loginmodal.component';
import { ServloginService } from 'src/app/servlogin/servlogin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private modal: MatDialog,
    private servlogin: ServloginService,
    private router: Router
  ) {}

  loginModal() {
    this.modal.open(LoginmodalComponent);
  }

  get isLoggedIn(): boolean {
    return this.servlogin.isLoggedIn();
  }

  get nomeUtilizador(): any {
    return this.servlogin.lerNomeUtilizador();
  }

  get isAdmin(): boolean {
    const perfilUtilizador = this.servlogin.lerPerfil();
    if (perfilUtilizador === "user") {
      return false
    }
    return true;
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}

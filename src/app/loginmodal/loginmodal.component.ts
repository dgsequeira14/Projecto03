import { Component } from '@angular/core';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Utilizador } from '../shared/utilizador.model';
import { ServloginService } from '../servlogin/servlogin.service';

@Component({
  selector: 'app-loginmodal',
  templateUrl: './loginmodal.component.html',
  styleUrls: ['./loginmodal.component.css'],
})
export class LoginmodalComponent {
  email!: FormControl;
  password!: FormControl;
  loginForm: FormGroup;
  erroUtilizadorInexistente!: string;

  constructor(
    private formBuilder: FormBuilder,
    private servlogin: ServloginService,
    private dialogRef: MatDialogRef<LoginmodalComponent>
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8}$/
          ),
        ],
      ],
    });
  }

  validarLogin() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.servlogin.validarCredenciais(email, password).subscribe(
        (utilizadorValidado: any) => {
          if (utilizadorValidado.isValid) {
            localStorage.setItem('userId', utilizadorValidado.userId?.toString() ?? ''
            );
            localStorage.setItem('nomeUtilizador', utilizadorValidado.nomeUtilizador);
            localStorage.setItem('perfilUtilizador', utilizadorValidado.perfilUtilizador);
            localStorage.setItem(
              'estadoUtilizador',
              utilizadorValidado.estadoUtilizador
            );
            this.servlogin.setLoggedIn(true);
            this.dialogRef.close();
          } else {
            this.erroUtilizadorInexistente = "Utilizador Inexistente.";
          }
        },
        (erro: any) => {
          console.error('Erro:', erro);
        }
      );
    }
  }

  /**
   * Método para mostrar mensagens de erro na modal associadas ao funcionamento do formulário Angular Material 
   */
  mensagemErro(erro: string) {
    const controlarErro = this.loginForm.get(erro);
    if (controlarErro!.hasError('required')) {
      return 'O campo é de preenchimento obrigatório.';
    } else if (controlarErro!.hasError('email')) {
      return 'E-mail inválido.';
    }
    return 'Password incorrecta.';
  }

  fecharModal() {
    this.dialogRef.close();
  }
}


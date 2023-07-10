// import { Component } from '@angular/core';
// import {
//   FormControl,
//   Validators,
//   FormsModule,
//   ReactiveFormsModule,
//   FormGroup,
//   FormBuilder,
// } from '@angular/forms';
// import { NgIf } from '@angular/common';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatDialogRef } from '@angular/material/dialog';
// import { MatIconModule } from '@angular/material/icon';

// @Component({
//   selector: 'app-loginmodal',
//   templateUrl: './loginmodal.component.html',
//   styleUrls: ['./loginmodal.component.css'],
// })
// export class LoginmodalComponent {
//   email = new FormControl('', [Validators.required, Validators.email]);
//   password = new FormControl('', [Validators.required]);
//   hide: boolean = true;
//   loginForm!: FormGroup;
//   // password!: string;

//   constructor(
//     private modal: MatDialogRef<LoginmodalComponent>,
//     // private formBuilder: FormBuilder
//   ) {
//     // this.loginForm = this.formBuilder.group({
//     //   email: new FormControl('', [Validators.required, Validators.email]),
//     //   password: new FormControl('', [Validators.required]),
//     // });
//   }

//   mensagemErro() {
//     if (this.email?.hasError('required')) {
//       return 'O campo é de preenchimento obrigatório.';
//     }
//     return this.email?.hasError('email') ? 'E-mail inválido' : '';
//   }

//   fecharModal() {
//     this.modal.close();
//   }
// }

import { Component } from '@angular/core';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Utilizador } from '../shared/utilizador.model';
import { ServloginService } from '../servlogin/servlogin.service';

@Component({
  selector: 'app-loginmodal',
  templateUrl: './loginmodal.component.html',
  styleUrls: ['./loginmodal.component.css'],
})
export class LoginmodalComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide = true;
  loginForm: FormGroup;
  listaUtilizadores: Utilizador[] = [];

  constructor(
    private modal: MatDialogRef<LoginmodalComponent>,
    private formBuilder: FormBuilder,
    private servlogin: ServloginService
  ) {
    this.loginForm = this.formBuilder.group({
      // email: ['', [Validators.required, Validators.email]],
      // password: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]+$/
          ),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  mensagemErro(mensagem: string) {
    const controlarErro = this.loginForm.get(mensagem);
    if (controlarErro?.hasError('required')) {
      return 'O campo é de preenchimento obrigatório.';
    }
    return controlarErro?.hasError('email') ? 'E-mail inválido' : '';
  }

  fecharModal() {
    this.modal.close();
  }

  validarLogin() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.servlogin
        .listarUtilizadores()
        .subscribe((utilizadores: Utilizador[]) => {
          const utilizadorExistente = utilizadores.find(
            (utilizador) =>
              utilizador.email === email && utilizador.password === password
          );
          if (utilizadorExistente) {
            if (utilizadorExistente.perfil === 'admin') {
              console.log('Admin');
            } else if (utilizadorExistente.perfil === 'user') {
              console.log('User');
            } else {
              console.log('Errado');
            }
          }
        });
    }
  }
}

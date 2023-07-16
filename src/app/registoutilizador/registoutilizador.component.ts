import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServloginService } from '../servlogin/servlogin.service';
import { Location } from '@angular/common';
import { Utilizador } from '../shared/utilizador.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarmodalComponent } from '../shared/confirmarmodal/confirmarmodal.component';

@Component({
  selector: 'app-registoutilizador',
  templateUrl: './registoutilizador.component.html',
  styleUrls: ['./registoutilizador.component.css'],
})
export class RegistoutilizadorComponent {
  formUtilizador!: FormGroup;
  erroEmail : boolean = false;

  constructor(
    private servutilizador: ServloginService,
    private formBuilder: FormBuilder,
    private location: Location,
    private modal: MatDialog
  ) {}

  ngOnInit() {
    this.formUtilizador = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8}$/
          ),
        ],
      ],
      morada: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      pais: ['', Validators.required],
    });
  }

  inserirUtilizador() {
    const novoUtilizador = this.formUtilizador.value;
    
    this.servutilizador.listarUtilizadores().subscribe(
      (utilizadores: Utilizador[]) => {
        const emailExistente = utilizadores.find(
          (utilizador) => utilizador.email === novoUtilizador.email
        );

        if (emailExistente) {
          this.erroEmail = true;
          this.formUtilizador.reset();
        } else {
          novoUtilizador.perfil = 'user';
          novoUtilizador.estado = 'inativo';

          this.servutilizador.inserirUtilizador(novoUtilizador).subscribe(
            (resposta) => {
              this.formUtilizador.reset();
              this.abrirConfirmarModal();
              this.erroEmail = false;
            },
            (erro) => {
              console.error('Erro na inserção do utilizador:', erro);
            }
          );
        }
      },
      (erro) => {
        console.error('Erro na inserção do utilizador:', erro);
      }
    );
  }

  abrirConfirmarModal() {
    this.modal.open(ConfirmarmodalComponent);
  }
}

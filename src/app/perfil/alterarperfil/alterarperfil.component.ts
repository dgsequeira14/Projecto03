import { Location } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ServloginService } from 'src/app/servlogin/servlogin.service';
import { Utilizador } from 'src/app/shared/utilizador.model';

@Component({
  selector: 'app-alterarperfil',
  templateUrl: './alterarperfil.component.html',
  styleUrls: ['./alterarperfil.component.css'],
})
export class AlterarperfilComponent {
  formUtilizador!: FormGroup;
  erroEmail: boolean = false;
  @Input() utilizador!: Utilizador;

  @Output() formSubmetido = new EventEmitter<void>();

  constructor(
    private servutilizador: ServloginService,
    private formBuilder: FormBuilder,
    private location: Location,
    private modal: MatDialog
  ) {}

  ngOnInit() {
    this.formUtilizador = this.formBuilder.group({
      nome: ['', Validators.required],
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
      morada: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      pais: ['', Validators.required],
    });
  }

  atualizarUtilizador() {
    const utilizadorAlterado = this.formUtilizador.value;

    this.servutilizador.listarUtilizadores().subscribe(
      (utilizadores: Utilizador[]) => {
        const emailExistente = utilizadores.find(
          (utilizador) => utilizador.email === utilizadorAlterado.email
        );

        if (emailExistente && emailExistente.id !== this.utilizador.id) {
          this.erroEmail = true;
          this.formUtilizador.reset();
        } else {
          this.servutilizador
            .updateUtilizador(this.utilizador.id, utilizadorAlterado)
            .subscribe(
              (resposta) => {
                alert('Informações Atualizadas!');
                this.formUtilizador.reset();
                this.erroEmail = false;
                this.formSubmetido.emit();
                window.location.reload();
              },
              (erro) => {
                console.error('Erro na atualização do utilizador:', erro);
              }
            );
        }
      },
      (erro) => {
        console.error('Erro:', erro);
      }
    );
  }
}


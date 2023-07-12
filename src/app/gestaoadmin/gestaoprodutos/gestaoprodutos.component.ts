import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServprodutosService } from 'src/app/servprodutos/servprodutos.service';

@Component({
  selector: 'app-gestaoprodutos',
  templateUrl: './gestaoprodutos.component.html',
  styleUrls: ['./gestaoprodutos.component.css'],
})
export class GestaoprodutosComponent {
  formProduto!: FormGroup;
  produto!: FormControl;
  marca!: FormControl;
  cor!: FormControl;
  preco!: FormControl;
  descricao!: FormControl;

  constructor(private servprodutos: ServprodutosService) {}

  ngOnInit() {
    this.formProduto = new FormGroup({
      produto: new FormControl('', [Validators.required]),
      marca: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required]),
      cor: new FormControl('', [Validators.required]),
      preco: new FormControl('', [Validators.required]),
      descricao: new FormControl(''),
    });
  }

  inserirProduto() {
    console.log(this.formProduto.value);
    this.servprodutos.inserirProduto(this.formProduto.value)
    // this.pessoa.emit(this.formProduto.value);
    this.formProduto.reset();
  }

  mensagemErro(erro: string) {
    const controlarErro = this.formProduto.get(erro);
    if (controlarErro!.hasError('required')) {
      return 'O campo é de preenchimento obrigatório.';
    }
    return 'O campo é de preenchimento obrigatório.';
  }
}

import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ServprodutosService } from 'src/app/servprodutos/servprodutos.service';
import { Produto } from 'src/app/shared/produto.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  imagens = [
    { nome: 'slider1.jpg', legenda: 'slider1' },
    { nome: 'slider2.jpg', legenda: 'slider2' },
    { nome: 'slider3.jpg', legenda: 'slider3' },
  ];

  listaProdutos: Produto[] = [];
  destaque!: boolean;

  constructor(private servprodutos: ServprodutosService) {}

  ngOnInit() {
    this.mostrarProdutos();
  }
  
  mostrarProdutos() {
    this.servprodutos.listarTodosProdutos().subscribe({
      next: (produtos) => {
        this.listaProdutos = produtos;
      },
      error: (erro) => console.error('Error fetching produtos:', erro),
    });
  }
}

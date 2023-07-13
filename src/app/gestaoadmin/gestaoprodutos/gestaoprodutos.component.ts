import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServprodutosService } from 'src/app/servprodutos/servprodutos.service';
import { Produto } from 'src/app/shared/produto.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EliminarmodalComponent } from 'src/app/eliminarmodal/eliminarmodal.component';

@Component({
  selector: 'app-gestaoprodutos',
  templateUrl: './gestaoprodutos.component.html',
  styleUrls: ['./gestaoprodutos.component.css'],
})
export class GestaoprodutosComponent implements OnInit {
  formProduto!: FormGroup;
  listaProduto: Produto[] = [];
  displayedColumns: string[] = [
    'foto',
    'marca',
    'produto',
    'tipo',
    'cor',
    'preco',
    'descricao',
    'destaque',
    'operacao',
  ];
  dataSource = new MatTableDataSource<Produto>(this.listaProduto);
  campoPesquisa: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private servprodutos: ServprodutosService,
    private location: Location,
    private modal: MatDialog
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.formProduto = this.formBuilder.group({
      nome: ['', Validators.required],
      marca: ['', Validators.required],
      tipo_de_produto: ['', Validators.required],
      cor: ['', Validators.required],
      preco: ['', Validators.required],
      foto_principal: ['.jpg', Validators.required],
      descricao: [''],
      destaque: [false],
    });

    this.dataSource.paginator = this.paginator;

    this.lerProdutos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  lerProdutos() {
    this.servprodutos.listarTodosProdutos().subscribe(
      (produtos) => {
        this.listaProduto = produtos;
        this.filtrarLista();
      },
      (erro) => {
        console.error('Erro na inserção do produto:', erro);
      }
    );
  }

  inserirProduto() {
    this.servprodutos.inserirProduto(this.formProduto.value).subscribe(
      (response) => {
        this.formProduto.reset();
        this.lerProdutos();
      },
      (erro) => {
        console.error('Erro na inserção do produto:', erro);
      }
    );
  }

  eliminaProduto(id: number) {
    this.servprodutos.eliminarProduto(id).subscribe((produto) => {
      this.lerProdutos();
    });
  }

  eliminarModal(id: number) {
    this.modal.open(EliminarmodalComponent, {
      data: { id: id },
    });
  }

  processaPesquisa() {
    this.servprodutos.pesquisarProduto(this.campoPesquisa).subscribe(
      (produtos) => {
        this.listaProduto = produtos;
        this.filtrarLista();
      },
      (erro) => {
        console.error('Erro pesquisa:', erro);
      }
    );
  }

  filtrarLista() {
    const palavraPesquisada = this.campoPesquisa.toLowerCase();
    this.dataSource.data = this.listaProduto.filter((produto) =>
      produto.nome.toLowerCase().includes(palavraPesquisada)
    );
  }

  limpaPesquisa() {
    this.campoPesquisa = '';
    this.lerProdutos();
  }

  mensagemErro(erro: string) {
    return 'O campo é de preenchimento obrigatório.';
  }

  onPageChange(event: any) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.paginator.page.emit(event);
  }

  voltarPaginaAnterior() {
    this.location.back();
  }
}

import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServprodutosService } from '../servprodutos/servprodutos.service';

@Component({
  selector: 'app-eliminarmodal',
  templateUrl: './eliminarmodal.component.html',
  styleUrls: ['./eliminarmodal.component.css'],
})
export class EliminarmodalComponent {
  @Input() id!: number;

  constructor(
    private servprodutos: ServprodutosService,
    private dialogRef: MatDialogRef<EliminarmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  eliminaProduto() {
    this.servprodutos.eliminarProduto(this.data.id).subscribe((produto) => {
      this.dialogRef.close();
      window.location.reload();
    });
  }

  fecharModal() {
    this.dialogRef.close();
  }
}

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css'],
})
export class FiltroComponent {
  tipoSelecionado: string[] = [];
  corSelecionada: string[] = [];
  @Output() filtro: EventEmitter<any> = new EventEmitter<any>();

  emitirFiltro() {
    this.filtro.emit({ tipo: this.tipoSelecionado, cor: this.corSelecionada });
  }

  toggleTipo(tipo: string) {
    if (this.tipoSelecionado.includes(tipo)) {
      this.tipoSelecionado = this.tipoSelecionado.filter((x) => x !== tipo);
    } else {
      this.tipoSelecionado.push(tipo);
    }
    this.emitirFiltro();
  }

  toggleCor(cor: string) {
    if (this.corSelecionada.includes(cor)) {
      this.corSelecionada = this.corSelecionada.filter((x) => x !== cor);
    } else {
      this.corSelecionada.push(cor);
    }
    this.emitirFiltro();
  }
}

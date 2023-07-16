import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-gestaoadmin',
  templateUrl: './gestaoadmin.component.html',
  styleUrls: ['./gestaoadmin.component.css'],
})
export class GestaoadminComponent {
  
  constructor(private location: Location) {}
  
  voltarPaginaAnterior() {
    this.location.back();
  }
}

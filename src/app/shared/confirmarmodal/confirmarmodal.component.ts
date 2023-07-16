import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmarmodal',
  templateUrl: './confirmarmodal.component.html',
  styleUrls: ['./confirmarmodal.component.css'],
})
export class ConfirmarmodalComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmarmodalComponent>, 
    private router: Router) {}

  fecharModal() {
    this.dialogRef.close();
    this.router.navigate(['']);
    
  }
}

import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { modalService } from '../../services/modal.service';


@Component({
  selector: 'app-modal-state',
  templateUrl: 'modal-state.component.html'
})
export class ModalStateComponent {

  
  constructor(
    private ModalService: modalService,
    public dialogRef: MatDialogRef<ModalStateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any


  ) {}
  
  playGameButton() {
    // Emitir el evento de reinicio
    this.ModalService.resetGame.emit();
    // Cerrar el modal
    this.dialogRef.close();
    console.log('esto no hace nada')
  }
}


 
 

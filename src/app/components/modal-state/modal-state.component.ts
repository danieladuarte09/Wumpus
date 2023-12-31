import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-modal-state',
  templateUrl: 'modal-state.component.html'
})
export class ModalStateComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalStateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  
}

/*export class ModalStateComponent  {
  showModal: boolean = false;

  constructor(public dialog: MatDialog) {}
  //constructor(private modalService: ModalService) { }
  //constructor(private dialog: MatDialog) { }
 /*
  ngOnInit(): void {
    // Suscribirse a los cambios en el servicio
    this.modalService.modalObserver().subscribe((value: boolean) => {
      this.showModal = value;
    });

  }
 
 
}*/
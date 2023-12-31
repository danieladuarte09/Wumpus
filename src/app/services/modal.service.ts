import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { ModalStateComponent } from '../components/modal-state/modal-state.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
/*export class ModalService {
  private game$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);*/

  export class modalService {
    constructor(public dialog: MatDialog) {}

    resetGame: EventEmitter<void> = new EventEmitter<void>();

  openDialog(message: string): void {
    const dialogRef = this.dialog.open(ModalStateComponent, {
      data: { message }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  }

 /* modalObserver(): Observable<boolean> {
    return this.game$.asObservable();
  }

   setModalState(value: boolean) {
    this.game$.next(value);
  }*/

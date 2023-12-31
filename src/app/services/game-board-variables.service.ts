import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameBoardVariablesService {
  private game$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private arrow$: BehaviorSubject<number> = new BehaviorSubject<number>(3);
 


  modalObserver(): Observable<string> {
    return this.game$.asObservable()
  }

  setModalState(value: string) {
    this.game$.next(value);
  }


  arrowObserver():Observable<number> {
    return this.arrow$.asObservable()
  }

  setArrowState(value: number) {
    this.arrow$.next(value);
  }

 


}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { InitialStructure } from '../Models/initial-structure.model';

@Injectable({
  providedIn: 'root'
})
export class GameConfigServiceService {

  private gameConfig$: ReplaySubject<InitialStructure> = new ReplaySubject<InitialStructure>(1);

  getConfigObserver(): Observable<InitialStructure> {
    return this.gameConfig$.asObservable();
  }

  updateConfig(config: InitialStructure) {
    this.gameConfig$.next(config);
  }

}

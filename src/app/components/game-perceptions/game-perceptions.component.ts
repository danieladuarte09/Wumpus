import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { GameBoardComponent } from '../game-board/game-board.component';
import {GameBoardVariablesService} from '../../services/game-board-variables.service'
import { Subscriber, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-game-perceptions',
  templateUrl: './game-perceptions.component.html',
  styleUrl: './game-perceptions.component.scss'
})
export class GamePerceptionsComponent implements OnInit, OnDestroy{

  gamePerceptionsHijo: string | undefined = '';
  arrowCount: number = 0;
  //destroy!: Subscription;
  private modalSubscription: Subscription | undefined;
  private ArrowSubscription: Subscription | undefined

  constructor(private gamePerceptionsService: GameBoardVariablesService ){  }

  ngOnInit(): void {    
    this.modalSubscription =  this.gamePerceptionsService.modalObserver().subscribe(data=> {
    console.log(data);
    this.gamePerceptionsHijo = data;

    });

    this. ArrowSubscription = this.gamePerceptionsService.arrowObserver().subscribe((cantidad: number) => {
      this.arrowCount = cantidad;
    
  });
}

  ngOnDestroy(): void {

    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }

    if (this.ArrowSubscription) {
      this.ArrowSubscription.unsubscribe();
    }
  }
}

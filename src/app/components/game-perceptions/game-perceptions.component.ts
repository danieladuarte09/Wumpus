import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  arrowInformation : string  = '';

  //destroy!: Subscription;
  private modalSubscription: Subscription | undefined;
  private ArrowSubscription: Subscription | undefined;
  private arrowInformationSubscription:  Subscription | undefined;


  constructor(private gameBoardVariablesService: GameBoardVariablesService ){  }

  ngOnInit(): void {    
    this.modalSubscription =  this.gameBoardVariablesService.modalObserver().subscribe(data=> {
    console.log(data);
    this.gamePerceptionsHijo = data;

    });

    this.ArrowSubscription = this.gameBoardVariablesService.arrowObserver().subscribe((cantidad: number) => {
      this.arrowCount = cantidad;
    
  });

  this.arrowInformationSubscription = this.gameBoardVariablesService.arrowInformationObserver().subscribe(data =>{
    console.log('gameP componente:', data);
    this.arrowInformation = data;
    
  });

}

  ngOnDestroy(): void {

    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }

    if (this.ArrowSubscription) {
      this.ArrowSubscription.unsubscribe();
    }

    if (this.arrowInformationSubscription) {
      this.arrowInformationSubscription.unsubscribe();
    }

  }
}

import { Injectable } from '@angular/core';
import { GameConfigServiceService } from './game-config-service.service';

@Injectable({
  providedIn: 'root'
})
export class GameMatrizService {

  paramStructure = this.gameConfigService;

  constructor (private gameConfigService: GameConfigServiceService){}

}
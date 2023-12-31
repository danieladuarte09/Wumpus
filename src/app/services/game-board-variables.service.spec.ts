import { TestBed } from '@angular/core/testing';

import { GameBoardVariablesService } from './game-board-variables.service';

describe('GameBoardVariablesService', () => {
  let service: GameBoardVariablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameBoardVariablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

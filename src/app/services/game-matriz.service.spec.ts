import { TestBed } from '@angular/core/testing';

import { GameMatrizService } from './game-matriz.service';

describe('GameMatrizService', () => {
  let service: GameMatrizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameMatrizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

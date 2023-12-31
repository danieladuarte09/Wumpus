import { TestBed } from '@angular/core/testing';

import { GameConfigServiceService } from './game-config-service.service';

describe('GameConfigServiceService', () => {
  let service: GameConfigServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameConfigServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

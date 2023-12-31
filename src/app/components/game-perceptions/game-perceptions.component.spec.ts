import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePerceptionsComponent } from './game-perceptions.component';

describe('GamePerceptionsComponent', () => {
  let component: GamePerceptionsComponent;
  let fixture: ComponentFixture<GamePerceptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamePerceptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GamePerceptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

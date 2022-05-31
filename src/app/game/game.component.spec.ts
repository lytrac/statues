import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from '../app.module';
import { GameService } from '../services/game.service';

import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let gameService: GameService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameComponent],
      imports: [RouterTestingModule, AppModule]
    })
      .compileComponents();
    gameService = TestBed.inject(GameService);
    localStorage.clear();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.start("David");
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the score if we step left', (done) => {
    setTimeout(() => {
      component.left();
      expect(component.score).toBe(1);
      done();
    }, 4000);
  });

  it('should update the score if we step right', (done) => {
    setTimeout(() => {
      component.right();
      expect(component.score).toBe(1);
      done();
    }, 4000);
  });

  it('should update the score if we step multiple times', (done) => {
    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        component.right();
        component.left();
      }
      expect(component.score).toBe(10);
      done();
    }, 4000);
  });

});

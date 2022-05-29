import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, tap, timer } from 'rxjs';
import { ScoreService } from '../services/score.service';

export enum Step {
  None,
  Right,
  Left
}

export enum LightColor {
  Red,
  Green
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit {

  score: number = 0;

  lastStep: Step = Step.None;
  lightColor = LightColor.Green;

  private _lightColorClass: string = "";
  get lightColorClass() {
    return this._lightColorClass;
  }
  set lightColorClass(lightColorClass: string) {
    this._lightColorClass = lightColorClass;
    this.cdr.detectChanges();
  }

  lightChange: Subject<LightColor> = new Subject<LightColor>();

  name: string = "";

  private _highScore: number = 0;
  set highScore(score: number) {
    this._highScore = this.scoreService.setHighScore(this.name, score);
    this.cdr.detectChanges();
  }
  get highScore() {
    return this._highScore;
  }

  constructor(private scoreService: ScoreService, private cdr: ChangeDetectorRef, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // TODO: Attribute name in variable
      if (params["name"]) {
        this.name = params["name"];
        this.highScore = this.scoreService.getHighScore(this.name);
      } else {
        // Shouldn't happen
        this.returnToHome();
      }
    });

    this.startGame();
  }

  ngOnDestroy(): void {
    console.log("Destroy");
  }

  left(): void {
    this.step(Step.Left);
  }

  right(): void {
    this.step(Step.Right);
  }

  returnToHome() {
    this.router.navigateByUrl("/home");
  }

  getGameIconClass(lightColor: LightColor): string {
    console.log("Comprobando clase");
    if (lightColor === LightColor.Green) {
      return "game__icon--green";
    } else {
      return "game__icon--red";
    }
  }

  step(stepSide: Step): void {
    if (this.lightColor === LightColor.Red) {
      this.score = 0;
      return;
    }

    if (this.lastStep == stepSide) {
      if (this.score > 0) {
        this.score--;
      }
      return;
    }

    this.lastStep = stepSide;
    this.score++;
    if (this.score > this.highScore) {
      this.highScore = this.score;
    }
  }

  startGame(): void {
    this.setTimer();
    this.lightColorClass = this.getGameIconClass(this.lightColor);
    this.lightChange.subscribe((color: LightColor) => {
      this.lightColorClass = this.getGameIconClass(color);
    });
  }

  setTimer(): void {
    timer(this.getLightTime()).subscribe(() => this.lightChange.next(this.changeColor()));
  }

  changeColor(): LightColor {
    if (this.lightColor === LightColor.Green) {
      this.lightColor = LightColor.Red;
    } else {
      this.lightColor = LightColor.Green;
    }
    this.setTimer();
    return this.lightColor;
  }

  getLightTime(): number {

    if (this.lightColor === LightColor.Green) {
      return Math.max(10000 - this.score * 100, 2000) + ((Math.random() * 3000) - 1500);
    }
    return 3000;
  }

}

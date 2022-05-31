import { Injectable } from "@angular/core";
import { Subject, timer } from "rxjs";
import { ScoreService } from "./score.service";

export enum Step {
    None,
    Right,
    Left
}

export enum LightColor {
    Off,
    Red,
    Green
}

@Injectable({
    providedIn: "root"
})
export class GameService {
    public lightChange: Subject<LightColor> = new Subject<LightColor>();
    public scoreChange: Subject<number> = new Subject<number>();
    public highScoreChange: Subject<number> = new Subject<number>();

    private lastStep: Step = Step.None;
    private lightColor = LightColor.Off;

    private _score: number = 0;
    set score(score: number) {
        this._score = score;
        this.scoreChange.next(this.score);
    }
    get score() {
        return this._score;
    }

    private _highScore: number = 0;
    set highScore(score: number) {
        this._highScore = this.scoreService.setHighScore(this.name, score);
        this.highScoreChange.next(this.highScore);
    }
    get highScore() {
        return this._highScore;
    }

    private name: string = "";

    constructor(private scoreService: ScoreService) {
    }

    public getGameIconClass(): string {
        if (this.lightColor === LightColor.Green) {
            return "game__icon--green";
        } else {
            return "game__icon--red";
        }
    }

    public step(stepSide: Step): void {
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

    public start(name: string): void {
        this.name = name;
        this.score = 0;
        this.highScore = this.scoreService.getHighScore(this.name);
        this.setTimer();
    }

    private setTimer(): void {
        timer(this.getLightTime()).subscribe(() => this.lightChange.next(this.changeColor()));
    }

    private changeColor(): LightColor {
        if (this.lightColor === LightColor.Off || this.lightColor === LightColor.Green) {
            this.lightColor = LightColor.Red;
        } else {
            this.lightColor = LightColor.Green;
        }
        this.setTimer();
        return this.lightColor;
    }

    private getLightTime(): number {
        if (this.lightColor === LightColor.Off) {
            return 0;
        }
        if (this.lightColor === LightColor.Green) {
            return Math.max(10000 - this.score * 100, 2000) + ((Math.random() * 3000) - 1500);
        }
        return 3000;
    }
}
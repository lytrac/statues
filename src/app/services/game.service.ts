import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { MediaService } from "./media.service";
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

const TIME_GREEN = 10000;
const TIME_GREEN_VARIATION = 3000;
const TIME_GREEN_MIN = 2000;
const TIME_GREEN_DECREMENT = 100;
const TIME_RED = 3000;

@Injectable({
    providedIn: "root"
})
export class GameService {
    public lightChange: Subject<LightColor> = new Subject<LightColor>();
    public scoreChange: Subject<number> = new Subject<number>();
    public highScoreChange: Subject<number> = new Subject<number>();

    private lastStep: Step = Step.None;
    private lightColor = LightColor.Off;

    private timeout: any;

    private _score: number = 0;
    set score(score: number) {
        this._score = this.scoreService.setCurrentScore(this.name, score);
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

    constructor(private scoreService: ScoreService, private mediaService: MediaService) {
    }

    public getGameIconClass(): string {
        if (this.lightColor === LightColor.Green) {
            return "game__icon--green";
        } else {
            return "game__icon--red";
        }
    }

    public step(stepSide: Step): number {
        if (this.lightColor === LightColor.Off) return this.score;

        if (this.lightColor === LightColor.Red) {
            if (this.score > 0) {
                this.score = 0;
                this.mediaService.longVibrate();
            }
            return this.score;
        }

        if (this.lastStep == stepSide) {
            if (this.score > 0) {
                this.score--;
            }
            this.mediaService.shortVibrate();
            return this.score;
        }

        this.lastStep = stepSide;
        this.score++;
        if (this.score > this.highScore) {
            this.highScore = this.score;
        }
        return this.score;
    }

    public start(name: string): void {
        this.name = name;
        this.score = this.scoreService.getCurrentScore(this.name);
        this.highScore = this.scoreService.getHighScore(this.name);
        this.setTimer();
    }

    public stop() {
        clearTimeout(this.timeout);
        this.mediaService.stopAudio();
    }

    private setTimer(): void {
        const time = this.getLightTime();
        this.startAudio(time);
        this.timeout = setTimeout(() => this.lightChange.next(this.changeColor()), time);
    }

    private changeColor(): LightColor {
        if (this.lightColor === LightColor.Off || this.lightColor === LightColor.Green) {
            this.lightColor = LightColor.Red;
        } else {
            // When green light comes, we can step with both feets
            this.lastStep = Step.None;
            this.lightColor = LightColor.Green;
        }
        this.setTimer();
        return this.lightColor;
    }

    private startAudio(time: number) {
        if (this.lightColor === LightColor.Green) {
            this.mediaService.startAudio(time);
        }
    }

    private getLightTime(): number {
        if (this.lightColor === LightColor.Off) {
            return 0;
        }
        if (this.lightColor === LightColor.Green) {
            return Math.max(TIME_GREEN - this.score * TIME_GREEN_DECREMENT, TIME_GREEN_MIN) + ((Math.random() * TIME_GREEN_VARIATION) - (TIME_GREEN_VARIATION / 2));
        }
        return TIME_RED;
    }
}
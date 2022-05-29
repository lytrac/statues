import { Injectable } from "@angular/core";
import { LightColor, Step } from "../enums";


@Injectable({
    providedIn: "root"
})
export class GameService {
    // step(score: number, lightColor: LightColor, stepSide: Step): void {
    //     if (lightColor === LightColor.Red) {
    //         score = 0;
    //         return;
    //     }

    //     if (lastStep == stepSide) {
    //         if (score > 0) {
    //             score--;
    //         }
    //         return;
    //     }

    //     this.lastStep = stepSide;
    //     this.score++;
    //     if (this.score > this.highScore) {
    //         this.highScore = this.score;
    //     }
    // }

    // startGame(): void {
    //     this.setTimer();
    // }

    // setTimer(): void {
    //     setTimeout(() => this.changeColor(), this.getLightTime());
    // }

    // changeColor(): void {
    //     if (this.lightColor === LightColor.Green) {
    //         this.lightColor = LightColor.Red;
    //     } else {
    //         this.lightColor = LightColor.Green;
    //     }
    //     this.cdr.detectChanges();
    //     this.setTimer();
    // }

    // getLightTime(lightColor: LightColor, score: number): number {

    //     if (lightColor === LightColor.Green) {
    //         return Math.max(10000 - score * 100, 2000) + ((Math.random() * 3000) - 1500);
    //     }
    //     return 3000;
    // }
}
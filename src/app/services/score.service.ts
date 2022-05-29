import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class ScoreService {
    setHighScore(name: string, score: number): number {
        if (this.getHighScore(name) < score) {
            localStorage.setItem(name, score.toString());
            return score;
        } else {
            return this.getHighScore(name);
        }
    }

    getHighScore(name: string): number {
        const stringScore = localStorage.getItem(name);
        if (!stringScore) {
            return 0;
        }

        const intScore = parseInt(stringScore);
        if (isNaN(intScore)) {
            return 0;
        }

        return intScore;
    }
}
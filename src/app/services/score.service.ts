import { Injectable } from "@angular/core";

export class Score {
    currentScore: number;
    highestScore: number;

    constructor(currentScore: number, highestScore: number) {
        this.currentScore = currentScore;
        this.highestScore = highestScore;
    }
}

const DATA_NAME = "scoreData";

@Injectable({
    providedIn: "root"
})
export class ScoreService {
    private data: Map<string, Score> = new Map();

    setHighScore(name: string, score: number): number {
        if (this.getHighScore(name) < score) {
            this.setLocalStorageValue(name, "highestScore", score);
            return score;
        } else {
            return this.getHighScore(name);
        }
    }

    getHighScore(name: string): number {
        return this.getLocalStorageValue(name, "highestScore");
    }

    setCurrentScore(name: string, score: number): number {
        this.setLocalStorageValue(name, "currentScore", score);
        return score;
    }

    getCurrentScore(name: string): number {
        return this.getLocalStorageValue(name, "currentScore");
    }

    private getLocalStorageValue(name: string, field: 'currentScore' | 'highestScore'): number {
        if (this.data.entries.length === 0) {
            this.data = this.getLocalStorageData();
        }
        if (!this.data.get(name)) {
            this.data.set(name, new Score(0, 0));
        }
        // Cast because we are 100% it has value
        return (this.data.get(name) as Score)[field];
    }

    private setLocalStorageValue(name: string, field: 'currentScore' | 'highestScore', value: number) {
        if (this.data.entries.length === 0) {
            this.data = this.getLocalStorageData();
        }
        if (!this.data.get(name)) {
            this.data.set(name, new Score(0, 0));
        }
        // Cast because we are 100% it has value
        (this.data.get(name) as Score)[field] = value;
        localStorage.setItem(DATA_NAME, JSON.stringify(Object.fromEntries(this.data)));
    }

    private getLocalStorageData(): Map<string, Score> {
        const localStorageData = localStorage.getItem(DATA_NAME);
        if (localStorageData) {
            return new Map<string, Score>(Object.entries(JSON.parse(localStorageData)));
        } else {
            return new Map();
        }
    }

    public getAllScores(): Map<string, Score>{
        return this.getLocalStorageData();
    }
}
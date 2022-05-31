import { TestBed } from '@angular/core/testing';
import { ScoreService } from './score.service';


describe('ScoreService', () => {
    let scoreService: ScoreService;


    beforeEach(async () => {
        scoreService = TestBed.inject(ScoreService);
    });

    it('should update highscore', () => {
        scoreService.setHighScore("Fernando", 50);
        expect(scoreService.getHighScore("Fernando")).toBe(50);
    })

    it('should not update highscore if there is a higher value', () => {
        scoreService.setHighScore("Fernando", 50);
        scoreService.setHighScore("Fernando", 25);
        expect(scoreService.getHighScore("Fernando")).toBe(50);
    })




});

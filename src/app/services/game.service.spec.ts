import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { GameService, Step } from './game.service';


describe('GameService', () => {
    let gameService: GameService;
    let originalTimeout = 0;

    // This tests require longer time than the default timeout
    beforeAll(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    });

    beforeEach(async () => {
        gameService = TestBed.inject(GameService);
        gameService.start("David");
    });

    afterEach(() => {
        gameService.stop();
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('should increase the value when green light', (done => {
        let score = 0;
        // Wait 4 seconds for the green light
        setTimeout(() => {
            score = gameService.step(Step.Left);
            expect(score).toBe(1);
            done();
        }, 4000);
    }));

    it('should decrease score by one point if we step two times in the same foot', (done => {
        let score = 0;
        // Wait 4 seconds for the green light
        setTimeout(() => {
            score = gameService.step(Step.Left);
            expect(score).toBe(1);
            score = gameService.step(Step.Left);
            expect(score).toBe(0);
            done();
        }, 4000);
    }));

    it('should walk', (done => {
        let score = 0;
        // Wait 4 seconds for the green light
        setTimeout(() => {
            score = gameService.step(Step.Left);
            expect(score).toBe(1);
            score = gameService.step(Step.Right);
            expect(score).toBe(2);
            score = gameService.step(Step.Left);
            expect(score).toBe(3);
            score = gameService.step(Step.Right);
            expect(score).toBe(4);
            done();
        }, 4000);
    }));

    it('should set value to zero if we step in red light', (done => {
        let score = 0;
        // Wait 4 seconds for the green light
        setTimeout(() => {
            score = gameService.step(Step.Left);
            expect(score).toBe(1);
            score = gameService.step(Step.Right);
            expect(score).toBe(2);
            score = gameService.step(Step.Left);
            expect(score).toBe(3);
            score = gameService.step(Step.Right);
            expect(score).toBe(4);
            // First green light should always last between 8500 and 11500. Previously we waited 4 seconds, so we have in the worst scenario 10.5 seconds remaining.
            setTimeout(() => {
                score = gameService.step(Step.Left);
                expect(score).toBe(0);
                done();
            }, 11000);
        }, 4000);
    }));
});

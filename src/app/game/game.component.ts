import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { GameService, Step } from '../services/game.service';
import { RouterService } from '../services/router.service';

const nameProperty = "name";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GameService]
})
export class GameComponent implements OnInit, OnDestroy {

  score: number = 0;
  highScore: number = 0;
  lightColorClass: string = "";
  name: string = "";

  constructor(
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private routerService: RouterService,
    private gameService: GameService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon(
      'steps-left',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/steps-left.svg')
    );
    this.iconRegistry.addSvgIcon(
      'steps-right',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/steps-right.svg')
    );
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (!params[nameProperty]) {
        // Shouldn't happen
        this.routerService.openHome();
        return;
      }

      this.start(params[nameProperty]);
    });
  }

  ngOnDestroy(): void {
    this.gameService.stop();
  }

  start(name: string) {
    this.name = name;
    // Subscribe to events before start, so we don't miss the highscore
    this.gameService.lightChange.subscribe(() => {
      this.lightColorClass = this.gameService.getGameIconClass();
      this.cdr.detectChanges();
    });
    this.gameService.scoreChange.subscribe((score) => {
      this.score = score;
      this.cdr.detectChanges();
    });
    this.gameService.highScoreChange.subscribe((highScore) => {
      this.highScore = highScore;
      this.cdr.detectChanges();
    });
    this.gameService.start(name);
  }

  left(): void {
    this.gameService.step(Step.Left);
  }

  right(): void {
    this.gameService.step(Step.Right);
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MediaService } from './services/media.service';
import { RouterService } from './services/router.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'Statues';
  home = false;
  game = false;
  muted = true;

  constructor(private mediaService: MediaService, private activatedRoute: ActivatedRoute, private router: Router, private routerService: RouterService, private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {
    this.router.events.subscribe((routeChange) => {
      // Need to check the event type because the event types doesn't share an interface
      if (routeChange instanceof NavigationEnd) {
        const navigationEndEvent = routeChange as NavigationEnd;

        if (this.routerService.isHome(navigationEndEvent)) {
          this.home = true;
          this.game = false;
          this.title = "Statues";
        } else {
          this.home = false;
          this.game = true;
          if (this.routerService.isGame(navigationEndEvent)) {
            this.title = `Hi ${this.activatedRoute.snapshot.queryParamMap.get('name')}`;
          }
        }
      }
    });

    // Load icons as early as possible
    this.preloadIcons();
  }

  preloadIcons() {
    this.iconRegistry.addSvgIcon(
      'steps-left',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/steps-left.svg')
    );
    this.iconRegistry.addSvgIcon(
      'steps-right',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/steps-right.svg')
    );
  }

  goBack() {
    this.routerService.openHome();
  }
  goToRanking() {
    this.routerService.openRanking();
  }

  mute() {
    this.muted = this.mediaService.toggleAudio();
  }
}

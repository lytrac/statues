import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MediaService } from './services/media.service';
import { PATHS, RouterService } from './services/router.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'Statues';
  muted = true;
  section: string = PATHS.home;

  PATHS = PATHS;

  constructor(private mediaService: MediaService, private activatedRoute: ActivatedRoute, private router: Router, private routerService: RouterService, private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {
    this.router.events.subscribe((routeChange) => {
      // Need to check the event type because the event types doesn't share an interface
      if (routeChange instanceof NavigationEnd) {
        const navigationEndEvent = routeChange as NavigationEnd;
        this.section = this.routerService.getCurrentSection(navigationEndEvent);
        this.title = this.getTitle();
      }
    });

    // Load icons as early as possible
    this.preloadIcons();
  }

  getTitle(): string {
    switch (this.section) {
      case PATHS.home:
        return "Statues";
      case PATHS.game:
        return `Hi ${this.activatedRoute.snapshot.queryParamMap.get('name')}`;
      case PATHS.ranking:
        return "Ranking";
      default:
        return "Statues";
    }
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

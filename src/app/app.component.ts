import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private routerService: RouterService, private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {
    this.router.events.subscribe((routeChange) => {
      // Need to check the event type because the event types doesn't share an interface
      if (routeChange instanceof NavigationEnd) {
        const navigationEndEvent = routeChange as NavigationEnd;

        if (this.routerService.isHome(navigationEndEvent)) {
          this.home = true;
          this.title = "Statues";
        } else {
          this.home = false;
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
}

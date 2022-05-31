import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router, RouterEvent } from '@angular/router';
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

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private routerService: RouterService) {
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
            console.log(this.router)
            this.title = `Hi ${this.activatedRoute.snapshot.queryParamMap.get('name')}`;
          }
        }
      }
    });
  }

  goBack() {
    this.routerService.openHome();
  }
  goToRanking() {
    this.routerService.openRanking();
  }
}

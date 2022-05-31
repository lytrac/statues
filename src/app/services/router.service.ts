import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

export const PATHS = {
    home: "home",
    game: "game",
    ranking: "ranking"
}

@Injectable({
    providedIn: "root"
})
export class RouterService {
    constructor(private router: Router) {
    }

    isHome(navigationEndEvent: NavigationEnd) {
        if (this.checkPath(navigationEndEvent, PATHS.home))
            return true;

        return false;
    }

    isGame(navigationEndEvent: NavigationEnd) {
        if (this.checkPath(navigationEndEvent, PATHS.game))
            return true;

        return false;
    }

    checkPath(navigationEndEvent: NavigationEnd, path: string) {
        // Add slash to match the path
        return navigationEndEvent.urlAfterRedirects.startsWith("/" + path);
    }

    openHome(): void {
        this.router.navigate([PATHS.home]);
    }

    openRanking(): void {
        this.router.navigate([PATHS.ranking]);
    }

    openGame(name: string): void {
        this.router.navigate([PATHS.game], { queryParams: { name } });
    }
}
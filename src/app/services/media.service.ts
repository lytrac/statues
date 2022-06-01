import { Injectable } from "@angular/core";

const SHORT_VIBRATE = [100];

const LONG_VIBRATE = [100, 100, 100, 100, 100, 100, 300];

@Injectable({
    providedIn: "root",
})
export class MediaService {

    longVibrate(): void {
        this.vibrate(LONG_VIBRATE);
    }

    shortVibrate(): void {
        this.vibrate(SHORT_VIBRATE);
    }

    vibrate(pattern: VibratePattern) {
        if (window.navigator && window.navigator['vibrate']) {
            window.navigator.vibrate(pattern);
        }
    }
}
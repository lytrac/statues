import { Injectable } from "@angular/core";

const SHORT_VIBRATE = [100];

const LONG_VIBRATE = [100, 100, 100, 100, 100, 100, 300];

@Injectable({
    providedIn: "root",
})
export class MediaService {
    private audio: HTMLAudioElement;
    public mute: boolean;

    constructor() {
        this.audio = new Audio('assets/audio/clock.aac');
        this.audio.loop = true;
        this.mute = true;
    }

    toggleAudio(): boolean {
        this.mute = !this.mute;
        this.audio.volume = this.mute ? 0 : 1;
        return this.mute;
    }

    longVibrate(): void {
        this.vibrate(LONG_VIBRATE);
    }

    shortVibrate(): void {
        this.vibrate(SHORT_VIBRATE);
    }

    private vibrate(pattern: VibratePattern) {
        this.audio.play();

        if (window.navigator && window.navigator['vibrate']) {
            window.navigator.vibrate(pattern);
        }
    }

    // Number of milliseconds to wait until pausing the audio
    startAudio(time: number) {
        if (!this.mute) {
            this.audio.playbackRate = 0.7;
            this.audio.play();

            setTimeout(() => {
                this.audio.playbackRate = 1;
                setTimeout(() => {
                    this.audio.playbackRate = 1.3;
                }, time / 4);
            }, time / 2);

            setTimeout(() => {
                this.stopAudio();
            }, time);
        }
    }

    stopAudio() {
        this.audio.pause();
        this.audio.playbackRate = 1;
    }
}
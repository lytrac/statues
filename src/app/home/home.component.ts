import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterService } from '../services/router.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
    constructor(private routerService: RouterService) { }

    name = new FormControl('', Validators.required);

    onSubmit(): void {
        if (this.name.valid) {
            this.routerService.openGame(this.name.value);            
        }
    }
}

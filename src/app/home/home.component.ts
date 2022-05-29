import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
    constructor(private router: Router) { }

    name = new FormControl('', Validators.required);

    onSubmit(): void {
        console.log("Submit");
        if (this.name.valid) {
            this.router.navigateByUrl('/game/' + this.name.value);
        }
    }
}

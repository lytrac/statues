import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {

  @Input() text: string = "";
  @Input() leadingIcon: string = "";
  @Input() trailingIcon: string = "";

  @Input() customClass: string = "";


  @Output() clicked: EventEmitter<any> = new EventEmitter<any>();

  click() {
    this.clicked.emit();
  }
}

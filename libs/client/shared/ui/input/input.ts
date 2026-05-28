import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';

@Component({
  selector: 'ui-input',
  imports: [CommonModule],
  templateUrl: './input.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {
  readonly inputId = input('');
  readonly label = input('');
  readonly error = input('');
  readonly disabled = input(false, { transform: booleanAttribute });
}

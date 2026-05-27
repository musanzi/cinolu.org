import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IService } from '@features/landing/data/services.data';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-service-card',
  imports: [LucideAngularModule, TranslateModule],
  templateUrl: './service-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceCard {
  service = input.required<IService>();
  titleKey = input.required<string>();
  descriptionKey = input.required<string>();
}

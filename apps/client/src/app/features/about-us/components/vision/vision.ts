import { Component } from '@angular/core';
import { LucideAngularModule, Rocket, Telescope } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-vision',
  imports: [LucideAngularModule, TranslateModule],
  templateUrl: './vision.html'
})
export class Vision {
  icons = {
    vision: Telescope,
    mission: Rocket
  };
}

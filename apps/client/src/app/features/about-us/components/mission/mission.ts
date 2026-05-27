import { Component } from '@angular/core';
import { LucideAngularModule, Rocket } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-mission',
  imports: [LucideAngularModule, TranslateModule],
  templateUrl: './mission.html',
  styles: ``
})
export class Mission {
  icons = {
    mission: Rocket
  };
}

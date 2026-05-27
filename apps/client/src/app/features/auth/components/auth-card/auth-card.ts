import { Component, input } from '@angular/core';
import { TEAM } from '../../data/team.data';
import { NgOptimizedImage } from '@angular/common';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-auth-card',
  imports: [NgOptimizedImage, RouterLink, LucideAngularModule, TranslateModule],
  templateUrl: './auth-card.html'
})
export class AuthCard {
  title = input.required<string>();
  description = input.required<string>();
  team = TEAM;
  icons = { arrowLeft: ArrowLeft };
}

import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingBar } from './layout/components/loading-bar/loading-bar';
import { LanguageService } from './core/services/language';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [RouterOutlet, LoadingBar],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  private readonly languageService = inject(LanguageService);
}

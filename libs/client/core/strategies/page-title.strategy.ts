import { inject, Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { SeoService } from '../services/seo';

@Injectable({
  providedIn: 'root'
})
export class PageTitleStrategy extends TitleStrategy {
  #seo = inject(SeoService);

  override updateTitle(routerState: RouterStateSnapshot): void {
    const pageTitle = this.buildTitle(routerState);
    this.#seo.applyFromRoute(routerState, pageTitle);
  }
}

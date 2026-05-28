import { afterNextRender, Directive, ElementRef, inject, Renderer2, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appAnimationsOnScroll]'
})
export class FadeInOnScrollDirective implements OnDestroy {
  #el = inject(ElementRef);
  #renderer = inject(Renderer2);
  #platformId = inject(PLATFORM_ID);
  #observer: IntersectionObserver | null = null;

  constructor() {
    if (!isPlatformBrowser(this.#platformId)) return;

    afterNextRender(() => {
      this.initStyles();

      const options: IntersectionObserverInit = {
        threshold: 0.1,
        rootMargin: '50px'
      };

      this.#observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              this.#renderer.addClass(this.#el.nativeElement, 'animate-slide-in');
            });
            this.#observer?.unobserve(this.#el.nativeElement);
          }
        });
      }, options);

      this.#observer.observe(this.#el.nativeElement);
    });
  }

  private initStyles(): void {
    this.#renderer.addClass(this.#el.nativeElement, 'duration-1000');
  }

  ngOnDestroy(): void {
    this.#observer?.disconnect();
    this.#observer = null;
  }
}

import { Directive, ElementRef, OnInit, Renderer2, PLATFORM_ID, OnDestroy, input, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appCountUp]'
})
export class CountUpDirective implements OnInit, OnDestroy {
  end = input<number>(0);
  duration = input<number>(2000);
  suffix = input<string>('+');
  #observer: IntersectionObserver | null = null;
  #el = inject(ElementRef<HTMLElement>);
  #renderer = inject(Renderer2);
  #platformId = inject(PLATFORM_ID);

  #animationFrameId: number | null = null;
  #hasAnimated = false;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.#platformId)) return;

    // Options optimisées pour déclencher plus tôt
    const options: IntersectionObserverInit = {
      threshold: 0.5, // Réduit de 0.6 à 0.5 pour démarrer plus tôt
      rootMargin: '50px' // Anticiper l'animation
    };

    this.#observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !this.#hasAnimated) {
        this.#hasAnimated = true;
        // Utiliser setTimeout pour éviter le blocage initial
        setTimeout(() => this.animateCount(), 100);
        this.#observer?.disconnect();
      }
    }, options);
    this.#observer.observe(this.#el.nativeElement);
  }

  ngOnDestroy(): void {
    // Nettoyer l'observer et l'animation frame
    this.#observer?.disconnect();
    this.#observer = null;
    if (this.#animationFrameId !== null) {
      cancelAnimationFrame(this.#animationFrameId);
      this.#animationFrameId = null;
    }
  }

  private animateCount(): void {
    const start = 0;
    const end = this.end();
    const range = end - start;
    const duration = this.duration();
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Utiliser une fonction d'easing pour une animation plus fluide
      const easedProgress = this.easeOutQuad(progress);
      const current = start + range * easedProgress;

      if (progress < 1) {
        this.#renderer.setProperty(this.#el.nativeElement, 'innerText', Math.floor(current).toLocaleString());
        this.#animationFrameId = requestAnimationFrame(step);
      } else {
        // Animation terminée
        this.#renderer.setProperty(this.#el.nativeElement, 'innerText', `${end.toLocaleString()}${this.suffix()}`);
        this.#animationFrameId = null;
      }
    };

    this.#animationFrameId = requestAnimationFrame(step);
  }

  // Fonction d'easing pour une animation plus naturelle
  private easeOutQuad(t: number): number {
    return t * (2 - t);
  }
}

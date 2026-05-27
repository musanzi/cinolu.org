import { Directive, Input, TemplateRef, ViewContainerRef, inject, effect, Signal } from '@angular/core';

@Directive({
  selector: '[appStepContent]'
})
export class StepContentDirective {
  #templateRef = inject(TemplateRef);
  #viewContainer = inject(ViewContainerRef);
  #hasView = false;

  @Input({ required: true }) appStepContent!: number;
  @Input({ required: true }) currentStep!: Signal<number>;

  constructor() {
    effect(() => {
      const current = this.currentStep();
      if (current === this.appStepContent && !this.#hasView) {
        this.#viewContainer.createEmbeddedView(this.#templateRef);
        this.#hasView = true;
      } else if (current !== this.appStepContent && this.#hasView) {
        this.#viewContainer.clear();
        this.#hasView = false;
      }
    });
  }
}

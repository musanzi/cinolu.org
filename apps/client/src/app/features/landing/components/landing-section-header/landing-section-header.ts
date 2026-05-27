import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { PublicSectionHeader } from '@shared/public';

/** @deprecated Prefer `app-public-section-header` directly. Wrapper for homepage sections. */
@Component({
  selector: 'app-landing-section-header',
  imports: [PublicSectionHeader],
  templateUrl: './landing-section-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingSectionHeader {
  badgeKey = input.required<string>();
  titleKey = input.required<string>();
  titleHighlightKey = input<string>();
  descriptionKey = input<string>();
  descriptionParams = input<Record<string, unknown>>();
  descriptionClass = input<string>();
}

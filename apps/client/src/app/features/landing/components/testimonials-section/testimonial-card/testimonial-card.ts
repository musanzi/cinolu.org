import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { Testimonial } from '@features/landing/data/testimonials.data';
import { LucideAngularModule, Quote, Star } from 'lucide-angular';

@Component({
  selector: 'app-testimonial-card',
  imports: [LucideAngularModule, NgClass],
  templateUrl: './testimonial-card.html'
})
export class TestimonialCard {
  testimonial = input.required<Testimonial>();
  quoteIcon = Quote;
  starIcon = Star;
}

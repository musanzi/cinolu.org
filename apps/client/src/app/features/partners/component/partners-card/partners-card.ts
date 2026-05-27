import { Component, input } from '@angular/core';
import { IPartner } from '../../../landing/data/partners.data';

@Component({
  selector: 'app-partners-card',
  imports: [],
  templateUrl: './partners-card.html'
})
export class PartnersCard {
  partner = input.required<IPartner | null>();
}

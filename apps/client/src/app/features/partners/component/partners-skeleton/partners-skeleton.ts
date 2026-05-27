import { Component } from '@angular/core';
import { PublicContainer, PublicSection } from '@shared/public';

@Component({
  selector: 'app-partners-skeleton',
  imports: [PublicSection, PublicContainer],
  templateUrl: './partners-skeleton.html'
})
export class PartnersSkeleton {}

import { Component } from '@angular/core';
import { IMemberItem, TEAM_MEMBERS } from '../../data/our-team.data';
import { FadeInOnScrollDirective } from '../../../../shared/directives/animations-on-scroll.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-our-team',
  imports: [FadeInOnScrollDirective, TranslateModule],
  templateUrl: './our-team.html'
})
export class OurTeam {
  our_team = TEAM_MEMBERS;

  selectedMember: IMemberItem = TEAM_MEMBERS[0];

  selectMember(member: IMemberItem): void {
    this.selectedMember = member;
  }
}

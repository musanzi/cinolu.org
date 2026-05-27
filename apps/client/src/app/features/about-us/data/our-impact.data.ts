import {
  ChartBar,
  CircleDollarSign,
  CircleUserRound,
  Globe,
  LucideIconData,
  UserRoundCheck,
  UsersRound
} from 'lucide-angular';

interface IOurImpact {
  value: number;
  artefact?: string;
  title: string;
  description: string;
  icon: LucideIconData;
}

export const OUR_IMPACT_ITEMS: IOurImpact[] = [
  {
    value: 500,
    title: 'Entrepreneurs accompagnés',
    description: 'Accompagnement des entrepreneurs en devenir',
    icon: UserRoundCheck
  },
  {
    value: 60,
    artefact: '%',
    title: 'Femmes bénéficiaires',
    description: 'Accompagnement des entrepreneurs en devenir',
    icon: CircleUserRound
  },
  {
    value: 3,
    title: 'Communautés régionales partenaires, Couverture nationale',
    description: 'Accompagnement des entrepreneurs en devenir',
    icon: Globe
  },
  {
    value: 150000,
    artefact: '$',
    title: 'Financements mobilisés',
    description: 'Accompagnement des entrepreneurs en devenir',
    icon: CircleDollarSign
  },
  {
    value: 438,
    artefact: '+',
    title: 'Solutions cartographiées via Fikiri',
    description: 'Accompagnement des entrepreneurs en devenir',
    icon: ChartBar
  },
  {
    value: 50,
    artefact: '+',
    title: 'Mentors, coachs et experts mobilisés',
    description: 'Accompagnement des entrepreneurs en devenir',
    icon: UsersRound
  }
];

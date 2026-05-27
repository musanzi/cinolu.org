import { Lightbulb, Globe, LucideIconData, BarChart3, Rocket, Handshake } from 'lucide-angular';

export interface IService {
  id: number;
  title: string;
  description: string;
  icon: LucideIconData;
}

export const SERVICES: IService[] = [
  {
    id: 1,
    title: 'Innovative Solutions',
    description: 'Identifier des solutions innovantes à des défis spécifiques',
    icon: Lightbulb
  },
  {
    id: 2,
    title: 'Co-Creation de Startups',
    description: 'Co-créer avec des startups ou talents locaux',
    icon: Handshake
  },
  {
    id: 3,
    title: 'Innovation Challenges',
    description: 'Lancer des appels à innovation ou défis thématiques',
    icon: Rocket
  },
  {
    id: 4,
    title: 'Project Management',
    description: 'Piloter des projets de transformation ou d’impact',
    icon: BarChart3
  },
  {
    id: 5,
    title: 'Ecosystem Mapping',
    description: 'Cartographier ou renforcer un écosystème local',
    icon: Globe
  }
];

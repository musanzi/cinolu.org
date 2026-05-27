import { Flag, Users, Briefcase, Globe, Settings } from 'lucide-angular';

export const HISTORY_TIMELINE = [
  {
    id: 1,
    status: 'Lancement',
    date: '2015',
    icon: Flag,
    color: '#9C27B0',
    image: 'cinolu-launch.jpg',
    description: 'Lancement du Cinolu, 1er hub d’innovation à Lubumbashi'
  },
  {
    id: 2,
    status: 'Programmes',
    date: '2017–2020',
    icon: Users,
    color: '#673AB7',
    description: 'Mise en œuvre de programmes genre & jeunesse (F360, civic tech…)'
  },
  {
    id: 3,
    status: 'Incubateur',
    date: '2021',
    icon: Briefcase,
    color: '#FF9800',
    description: 'Déploiement de l’incubateur Ushindi et de cohortes entrepreneuriales'
  },
  {
    id: 4,
    status: 'Expansion',
    date: '2023–2024',
    icon: Globe,
    color: '#607D8B',
    description: 'Déploiement régional (SOPA+, Afrilabs, Fikiri…) et création du Cinolu OneStop'
  },
  {
    id: 5,
    status: 'Structuration',
    date: '2025',
    icon: Settings,
    color: '#4CAF50',
    description: 'Structuration numérique complète de l’accompagnement et de l’impact'
  }
];

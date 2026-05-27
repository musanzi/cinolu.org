export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatar?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Mwamba',
    role: 'Entrepreneure tech',
    quote:
      "Grâce à OneStop, j'ai pu suivre ma formation et être accompagnée par un mentor sans quitter la plateforme. Une expérience fluide et enrichissante !",
    avatar: '/images/talent-default.jpg'
  },
  {
    id: 2,
    name: 'Jean Kabongo',
    role: 'Fondateur startup agritech',
    quote:
      "OneStop m'a permis de centraliser toutes mes candidatures et de suivre mon évolution. Un vrai gain de temps et d'efficacité.",
    avatar: '/images/about.jpg'
  },
  {
    id: 3,
    name: 'Marie Tshimanga',
    role: 'Porteur de projet',
    quote:
      "L'accès aux formations et le réseau de mentors ont été déterminants dans le développement de mon entreprise.",
    avatar: '/images/events.jpg'
  }
];

interface IPrograms {
  name: string;
  description: string;
  link: string;
  path: string;
}

export const PROGRAMS_ITEMS: IPrograms[] = [
  {
    name: 'F360 – Femmes 360',
    description: 'Pour l’autonomisation des femmes dans l’innovation et l’entrepreneuriat',
    link: 'Découvrir F360',
    path: 'F360'
  },
  {
    name: 'Ushindi',
    description: 'Pour la jeunesse et les professionnels en quête d’impact',
    link: 'Explorer Ushindi',
    path: 'Explorer Ushindi'
  },
  {
    name: 'Uvumbuzi',
    description: 'Pour transformer la recherche scientifique en solution concrète',
    link: 'Découvrir Uvumbuzi',
    path: 'Decouvrir Uvumbuzi'
  },
  {
    name: 'Cinolu Fellowship',
    description: 'Pour les volontaires, stagiaires et jeunes engagés',
    link: 'Rejoindre Fellowship',
    path: 'Cinolu Fellowship'
  },
  {
    name: 'Ushaidi',
    description: 'Pour favoriser l’inclusion numérique et l’expression citoyenne',
    link: 'Découvrir Ushaidi',
    path: 'Decouvrir Ushaidi'
  }
];

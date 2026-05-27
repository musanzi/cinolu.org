/**
 * Configuration du système de badges de parrainage
 * Cette configuration est extensible et facilement modifiable
 */

export interface BadgeLevel {
  /** Niveau du badge (1-5) */
  level: number;
  /** Nom du badge */
  name: string;
  /** Nombre d'inscriptions requises pour obtenir ce badge */
  threshold: number;
  /** Couleur principale du badge (TailwindCSS) */
  color: string;
  /** Couleur de la progression (TailwindCSS) */
  progressColor: string;
  /** Icône Lucide associée au badge */
  icon: string;
  /** Description courte du badge */
  description: string;
  /** Message de félicitation au déblocage */
  unlockMessage: string;
}

export const BADGE_LEVELS: BadgeLevel[] = [
  {
    level: 1,
    name: 'Ambassadeur',
    threshold: 0,
    color: 'text-blue-600',
    progressColor: 'bg-blue-600',
    icon: 'award',
    description: 'Tes premiers pas dans la communauté',
    unlockMessage: '🎉 Félicitations ! Tu es maintenant Ambassadeur Cinolu !'
  },
  {
    level: 2,
    name: 'Influenceur',
    threshold: 5,
    color: 'text-purple-600',
    progressColor: 'bg-purple-600',
    icon: 'trending-up',
    description: "Tu commences à avoir de l'impact",
    unlockMessage: '⭐ Incroyable ! Tu es maintenant Influenceur Cinolu !'
  },
  {
    level: 3,
    name: 'Leader',
    threshold: 15,
    color: 'text-orange-600',
    progressColor: 'bg-orange-600',
    icon: 'crown',
    description: 'Tu es un pilier de la communauté',
    unlockMessage: '👑 Exceptionnel ! Tu es maintenant Leader Cinolu !'
  },
  {
    level: 4,
    name: 'Mentor',
    threshold: 30,
    color: 'text-emerald-600',
    progressColor: 'bg-emerald-600',
    icon: 'sparkles',
    description: 'Tu inspires et guides les autres',
    unlockMessage: '✨ Extraordinaire ! Tu es maintenant Mentor Cinolu !'
  },
  {
    level: 5,
    name: 'Légende Cinolu',
    threshold: 50,
    color: 'text-amber-600',
    progressColor: 'bg-amber-600',
    icon: 'trophy',
    description: 'Tu es une légende vivante',
    unlockMessage: "🏆 LÉGENDAIRE ! Tu fais maintenant partie de l'élite Cinolu !"
  }
];

/**
 * Messages de partage personnalisés selon le niveau du badge
 */
export const SHARE_MESSAGES: Record<number, string> = {
  1: 'Je fais partie des Ambassadeurs Cinolu ! Rejoins-moi dans cette aventure entrepreneuriale',
  2: "Fier d'être Influenceur Cinolu ! Viens découvrir cette plateforme incroyable",
  3: 'Je suis devenu Leader Cinolu ! Ensemble, transformons nos idées en projets concrets',
  4: "Mentor Cinolu ici ! Rejoins une communauté engagée pour l'entrepreneuriat",
  5: "Légende Cinolu ! Fais partie de l'élite entrepreneuriale, rejoins-nous maintenant"
};

/**
 * Messages motivationnels selon la progression
 */
export const MOTIVATION_MESSAGES = {
  start: 'Partage ton lien et commence ton aventure !',
  close: (remaining: number) => `Plus que ${remaining} inscription${remaining > 1 ? 's' : ''} ! Tu y es presque 🔥`,
  halfway: (remaining: number) => `Excellent départ ! Encore ${remaining} pour le prochain niveau`,
  max: 'Tu as atteint le niveau maximum ! Continue de partager pour agrandir la communauté 🚀'
};

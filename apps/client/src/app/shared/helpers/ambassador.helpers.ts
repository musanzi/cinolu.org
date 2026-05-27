export type AmbassadorLevel = 'bronze' | 'silver' | 'gold' | 'diamond' | 'legend';

export interface AmbassadorBadge {
  level: AmbassadorLevel;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  minReferrals: number;
}

export const AMBASSADOR_LEVELS: Record<AmbassadorLevel, AmbassadorBadge> = {
  bronze: {
    level: 'bronze',
    label: 'Ambassadeur Bronze',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    minReferrals: 1
  },
  silver: {
    level: 'silver',
    label: 'Ambassadeur Argent',
    color: 'text-slate-600',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-200',
    minReferrals: 3
  },
  gold: {
    level: 'gold',
    label: 'Ambassadeur Or',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    minReferrals: 5
  },
  diamond: {
    level: 'diamond',
    label: 'Ambassadeur Diamant',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    minReferrals: 10
  },
  legend: {
    level: 'legend',
    label: 'Ambassadeur Légende',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    minReferrals: 20
  }
};


export function getAmbassadorLevel(referralsCount = 0): AmbassadorBadge {
  if (referralsCount >= AMBASSADOR_LEVELS.legend.minReferrals) {
    return AMBASSADOR_LEVELS.legend;
  }
  if (referralsCount >= AMBASSADOR_LEVELS.diamond.minReferrals) {
    return AMBASSADOR_LEVELS.diamond;
  }
  if (referralsCount >= AMBASSADOR_LEVELS.gold.minReferrals) {
    return AMBASSADOR_LEVELS.gold;
  }
  if (referralsCount >= AMBASSADOR_LEVELS.silver.minReferrals) {
    return AMBASSADOR_LEVELS.silver;
  }
  return AMBASSADOR_LEVELS.bronze;
}


export { getInitials } from './user.helper';

import { BadgeLevel, BADGE_LEVELS, MOTIVATION_MESSAGES, SHARE_MESSAGES } from '@shared/config/badges.config';

export interface BadgeResult {
  currentBadge: BadgeLevel;
  nextBadge: BadgeLevel | null;
  currentCount: number;
  progressPercentage: number;
  remainingCount: number;
  isMaxLevel: boolean;
  motivationMessage: string;
  shareMessage: string;
}

export function getCurrentBadge(referralCount: number): BadgeLevel {
  if (referralCount === 0) {
    return BADGE_LEVELS[0];
  }

  let currentBadge = BADGE_LEVELS[0];

  for (const badge of BADGE_LEVELS) {
    if (referralCount >= badge.threshold) {
      currentBadge = badge;
    } else {
      break;
    }
  }

  return currentBadge;
}

export function getNextBadge(currentBadge: BadgeLevel): BadgeLevel | null {
  const currentIndex = BADGE_LEVELS.findIndex((b) => b.level === currentBadge.level);

  if (currentIndex === -1 || currentIndex === BADGE_LEVELS.length - 1) {
    return null;
  }

  return BADGE_LEVELS[currentIndex + 1];
}

export function calculateProgress(
  referralCount: number,
  currentBadge: BadgeLevel,
  nextBadge: BadgeLevel | null
): number {
  if (!nextBadge) {
    return 100;
  }

  const previousThreshold = currentBadge.threshold;
  const targetThreshold = nextBadge.threshold;

  const progress = referralCount - previousThreshold;
  const total = targetThreshold - previousThreshold;

  return Math.min(Math.max(Math.round((progress / total) * 100), 0), 100);
}

export function getRemainingCount(referralCount: number, nextBadge: BadgeLevel | null): number {
  if (!nextBadge) {
    return 0;
  }

  return Math.max(0, nextBadge.threshold - referralCount);
}

export function getMotivationMessage(progressPercentage: number, remainingCount: number, isMaxLevel: boolean): string {
  if (isMaxLevel) {
    return MOTIVATION_MESSAGES.max;
  }

  if (progressPercentage === 0) {
    return MOTIVATION_MESSAGES.start;
  }

  if (progressPercentage >= 75) {
    return MOTIVATION_MESSAGES.close(remainingCount);
  }

  return MOTIVATION_MESSAGES.halfway(remainingCount);
}

export function calculateBadgeInfo(referralCount: number): BadgeResult {
  const currentBadge = getCurrentBadge(referralCount);
  const nextBadge = getNextBadge(currentBadge);
  const progressPercentage = calculateProgress(referralCount, currentBadge, nextBadge);
  const remainingCount = getRemainingCount(referralCount, nextBadge);
  const isMaxLevel = nextBadge === null;
  const motivationMessage = getMotivationMessage(progressPercentage, remainingCount, isMaxLevel);
  const shareMessage = SHARE_MESSAGES[currentBadge.level] || SHARE_MESSAGES[1];

  return {
    currentBadge,
    nextBadge,
    currentCount: referralCount,
    progressPercentage,
    remainingCount,
    isMaxLevel,
    motivationMessage,
    shareMessage
  };
}

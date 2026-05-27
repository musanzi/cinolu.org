import { Component, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReferralsStore } from '@features/dashboard/shared/store/referrals.store';
import { AuthStore } from '@core/auth/auth.store';
import { ReferralBadgesService, BadgeLevel } from '@features/dashboard/shared/services/referral-badges.service';
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Check,
  Crown,
  Flag,
  Info,
  Link,
  LockKeyhole,
  LucideAngularModule,
  LucideIconData,
  Share2,
  Sparkles,
  TrendingUp,
  Trophy
} from 'lucide-angular';

@Component({
  selector: 'app-referral-badges',
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './badges.html'
})
export class ReferralBadges implements OnInit {
  referralsStore = inject(ReferralsStore);
  authStore = inject(AuthStore);
  badgesService = inject(ReferralBadgesService);

  readonly icons = {
    arrowRight: ArrowRight,
    award: Award,
    check: Check,
    crown: Crown,
    flag: Flag,
    info: Info,
    link: Link,
    lock: LockKeyhole,
    share: Share2,
    sparkles: Sparkles,
    trendingUp: TrendingUp,
    trophy: Trophy,
    verified: BadgeCheck
  };

  private readonly badgeIconMap: Record<string, LucideIconData> = {
    award: Award,
    'trending-up': TrendingUp,
    crown: Crown,
    sparkles: Sparkles,
    trophy: Trophy
  };

  referralsCount = computed(() => {
    return this.authStore.user()?.referralsCount || this.referralsStore.referredUsers().length || 0;
  });

  badgeProgress = computed(() => {
    return this.badgesService.calculateProgress(this.referralsCount());
  });

  allBadges = computed(() => {
    return this.badgesService.getAllBadges();
  });

  unlockedBadges = computed(() => {
    return this.badgesService.getUnlockedBadges(this.referralsCount());
  });

  lockedBadges = computed(() => {
    return this.badgesService.getLockedBadges(this.referralsCount());
  });

  ngOnInit() {
    if (this.referralsStore.referredUsers().length === 0) {
      this.referralsStore.loadReferredUsers({ page: 1 });
    }
  }

  getBadgeGradientClass(color: string): string {
    const colorMap: Record<string, string> = {
      emerald: 'bg-emerald-600',
      blue: 'bg-blue-600',
      purple: 'bg-purple-600',
      orange: 'bg-orange-600',
      amber: 'bg-amber-600',
      slate: 'bg-gray-500'
    };
    return colorMap[color] || 'bg-gray-500';
  }

  isBadgeUnlocked(badge: BadgeLevel): boolean {
    return this.referralsCount() >= badge.minReferrals;
  }

  resolveBadgeIcon(icon: string): LucideIconData {
    return this.badgeIconMap[icon] ?? Award;
  }
}

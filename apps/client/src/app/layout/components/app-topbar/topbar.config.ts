import {
  Menu,
  X,
  ChevronDown,
  ArrowLeft,
  ChevronRight,
  Minus,
  LayoutGrid,
  LogOut
} from 'lucide-angular';

export const TOPBAR_ICONS = {
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,

  menu: Menu,
  close: X,
  arrowLeft: ArrowLeft,
  minus: Minus,

  dashboard: LayoutGrid,
  logOut: LogOut
} as const;

export const TOPBAR_ANIMATION = {
  mobileSubItemHeight: 44,
  mobileProgramItemHeight: 60,
  scrollThreshold: 20
} as const;

import { ResourceCategory } from '@shared/models';
import { SelectOption } from '@shared/ui';

export const RESOURCE_CATEGORY_LABELS: Record<ResourceCategory, string> = {
  [ResourceCategory.GUIDE]: 'Guide',
  [ResourceCategory.TEMPLATE]: 'Modèle',
  [ResourceCategory.LEGAL]: 'Juridique',
  [ResourceCategory.PITCH]: 'Pitch',
  [ResourceCategory.FINANCIAL]: 'Financier',
  [ResourceCategory.REPORT]: 'Rapport',
  [ResourceCategory.OTHER]: 'Autre'
};

export const RESOURCE_CATEGORY_OPTIONS: SelectOption[] = Object.values(ResourceCategory).map((value) => ({
  value,
  label: RESOURCE_CATEGORY_LABELS[value]
}));

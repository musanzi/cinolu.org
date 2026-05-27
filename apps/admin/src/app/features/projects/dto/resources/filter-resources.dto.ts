import { ResourceCategory } from '@shared/models';

export interface FilterResourcesDto {
  page?: number | null;
  category?: ResourceCategory | null;
  phase_id?: string | null;
}

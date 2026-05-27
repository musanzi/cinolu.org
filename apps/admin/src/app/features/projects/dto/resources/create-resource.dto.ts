import { ResourceCategory } from '@shared/models';

export interface CreateResourceDto {
  title: string;
  description: string;
  category: ResourceCategory;
  project_id?: string;
  phase_id?: string;
}

export interface UpdateResourceDto {
  title?: string;
  description?: string;
  category?: ResourceCategory;
}

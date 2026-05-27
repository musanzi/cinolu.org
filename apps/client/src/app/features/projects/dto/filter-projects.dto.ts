export interface FilterProjectsDto {
  page: string | null;
  categories?: string[] | null;
  status: 'past' | 'current' | 'future' | null;
  filter?: 'all' | 'published' | 'drafts' | 'highlighted';
}

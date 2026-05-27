export interface CreateParticipationReviewDto {
  phaseId: string;
  score: number;
  message?: string;
  notifyParticipant?: boolean;
}

export interface UpdateParticipationReviewDto {
  reviewId: string;
  score: number;
  message?: string;
  notifyParticipant?: boolean;
}

export type ReviewParticipationDto = CreateParticipationReviewDto | UpdateParticipationReviewDto;

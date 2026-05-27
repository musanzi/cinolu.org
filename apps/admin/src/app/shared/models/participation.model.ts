import { IBase } from './base.model';
import { IEvent } from './event.model';
import { IPhase } from './phase.model';
import { IProject as IProject } from './project.model';
import { IUser as IUser } from './user.model';
import { IVenture as IVenture } from './venture.model';

export interface IProjectParticipationUpvote extends IBase {
  user: IUser;
  participation: IProjectParticipation;
}

export interface IProjectParticipationReview extends IBase {
  participation: IProjectParticipation;
  phase: IPhase;
  reviewer: IUser;
  message: string | null;
  score: number;
}

export interface IProjectParticipation extends IBase {
  user: IUser;
  project: IProject;
  venture: IVenture | null;
  phases: IPhase[];
  upvotes?: IProjectParticipationUpvote[];
  upvotesCount?: number;
  isUpvoted?: boolean;
  reviews: IProjectParticipationReview[];
}

export interface IEventParticipation extends IBase {
  user: IUser;
  event: IEvent;
}

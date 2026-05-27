import { INotification, IProject } from '@shared/models';
import { NotifyParticipantsDto } from '../dto/notifications/notify-participants.dto';
import { SelectOption } from '@shared/ui/form';

export enum NotificationStatus {
  DRAFT = 'draft',
  SENT = 'sent'
}

export interface SubmitNotification {
  dto: NotifyParticipantsDto;
  attachments: File[];
}

export interface NotificationState {
  activeNotification: INotification | null;
  phaseOptions: SelectOption[];
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  isEditable: boolean;
  project: IProject;
}

export interface NotificationsState {
  notifications: INotification[];
  total: number;
  activeNotificationId: string | null;
  currentPage: number;
  itemsPerPage: number;
}

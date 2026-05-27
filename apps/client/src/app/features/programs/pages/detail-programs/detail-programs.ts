import { Component, inject, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  ArrowLeft,
  Calendar1,
  FileText,
  FolderOpenDot,
  LucideAngularModule,
  MessageCircleMore,
  MoveRight,
  MoveUpRight,
  NotepadText,
  Tag,
  ThumbsUp,
  UserPlus
} from 'lucide-angular';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProgramStore } from '../../../landing/store/program.store';
import { SubprogramCardSkeleton } from '../../component/subprogram-card-skeleton/subprogram-card-skeleton';
import { Subject, takeUntil } from 'rxjs';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '@shared/ui';

@Component({
  selector: 'app-detail-programs',
  providers: [ProgramStore],
  imports: [
    LucideAngularModule,
    CommonModule,
    RouterLink,
    SubprogramCardSkeleton,
    ButtonComponent,
    ApiImgPipe,
    NgOptimizedImage,
    TranslateModule
  ],
  templateUrl: './detail-programs.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailPrograms implements OnInit, OnDestroy {
  icons = {
    moveLeft: ArrowLeft,
    fileText: FileText,
    notepadText: NotepadText,
    userPlus: UserPlus,
    tag: Tag,
    comment: MessageCircleMore,
    like: ThumbsUp,
    calendar: Calendar1,
    moveUp: MoveUpRight,
    thumbsUp: ThumbsUp,
    program: FolderOpenDot,
    arrow: MoveRight
  };
  #route = inject(ActivatedRoute);
  store = inject(ProgramStore);
  destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.#route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const slug = params.get('slug');
      if (slug) this.store.loadProgram(slug);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

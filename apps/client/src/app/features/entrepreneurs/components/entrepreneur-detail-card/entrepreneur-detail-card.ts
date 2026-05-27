import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  LucideAngularModule,
  MoveRight,
  Users,
  MapPin,
  Briefcase,
  User,
  Package,
  Linkedin,
  Globe,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  Calendar,
  Target,
  TrendingUp,
  X,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-angular';
import { map } from 'rxjs';
import { PublicVentureStore } from '@features/entrepreneurs/store/venture.store';
import { IImage, IProduct, IUser, IVenture } from '../../../../shared/models';
import { ApiImgPipe, resolveApiImageUrl } from '../../../../shared/pipes';
import { ImageLightboxComponent } from '@shared/components/image-lightbox/image-lightbox';
import { ImageLightboxItem } from '@shared/components/image-lightbox/image-lightbox.model';
import { TranslateModule } from '@ngx-translate/core';
import { getInitials } from '@shared/helpers/user.helper';
import { EntrepreneurDetailCardSkeleton } from '../entrepreneur-detail-card-skeleton/entrepreneur-detail-card-skeleton';
import { SeoService } from '@core/services/seo';
import { PublicButton, PublicContainer, PublicSection } from '@shared/public';

@Component({
  selector: 'app-entrepreneur-detail-card',
  providers: [PublicVentureStore],
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule,
    ApiImgPipe,
    NgOptimizedImage,
    TranslateModule,
    EntrepreneurDetailCardSkeleton,
    ImageLightboxComponent,
    PublicSection,
    PublicContainer,
    PublicButton
  ],
  templateUrl: './entrepreneur-detail-card.html'
})
export class EntrepreneurDetailCard {
  #route = inject(ActivatedRoute);
  #seo = inject(SeoService);
  ventureStore = inject(PublicVentureStore);

  /** Toggle ouvert/fermé pour la section Parcours */
  parcoursExpanded = signal(true);

  /** Lightbox galerie venture */
  lightboxOpen = signal(false);
  lightboxItems = signal<ImageLightboxItem[]>([]);
  lightboxIndex = signal(0);

  icons = {
    users: Users,
    moveRight: MoveRight,
    mapPin: MapPin,
    briefcase: Briefcase,
    user: User,
    package: Package,
    linkedin: Linkedin,
    globe: Globe,
    email: Mail,
    phone: Phone,
    chevronDown: ChevronDown,
    chevronUp: ChevronUp,
    calendar: Calendar,
    target: Target,
    trendingUp: TrendingUp,
    x: X,
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight,
    eye: Eye
  };

  #slugParam = toSignal(
    this.#route.paramMap.pipe(
      map((params) => {
        const slug = params.get('slug') || '';
        return decodeURIComponent(slug).toLowerCase();
      })
    ),
    { initialValue: '' }
  );

  entrepreneur = computed<IUser | null>(() => {
    const venture = this.ventureStore.venture();
    return venture?.owner || null;
  });

  venture = computed<IVenture | null>(() => {
    return this.ventureStore.venture();
  });

  hasVenture = computed<boolean>(() => this.venture() !== null);

  // Computed signals pour vérifier l'existence des liens
  hasLinkedin = computed<boolean>(() => {
    const v = this.venture();
    return !!v?.linkedin_url && v.linkedin_url.trim() !== '';
  });

  hasWebsite = computed<boolean>(() => {
    const v = this.venture();
    return !!v?.website && v.website.trim() !== '';
  });

  hasEmail = computed<boolean>(() => {
    const v = this.venture();
    return !!v?.email && v.email.trim() !== '';
  });

  hasPhone = computed<boolean>(() => {
    const v = this.venture();
    return !!v?.phone_number && v.phone_number.trim() !== '';
  });

  hasAnyContact = computed<boolean>(() => {
    return this.hasLinkedin() || this.hasWebsite() || this.hasEmail() || this.hasPhone();
  });

  products = computed<IProduct[]>(() => this.venture()?.products ?? []);

  hasProducts = computed<boolean>(() => this.products().length > 0);

  getInitials = getInitials;

  toggleParcours(): void {
    this.parcoursExpanded.update((v) => !v);
  }

  openLightbox(images: IImage[], index: number): void {
    this.lightboxItems.set(
      images.map((image, i) => ({
        src: resolveApiImageUrl(image, 'gallery'),
        alt: `Image ${i + 1}`
      }))
    );
    this.lightboxIndex.set(index);
    this.lightboxOpen.set(true);
  }

  constructor() {
    effect(() => {
      const slug = this.#slugParam();
      if (slug) {
        this.ventureStore.loadVenture(slug);
      }
    });

    effect(() => {
      const venture = this.venture();
      if (!venture?.slug || !venture.name) return;

      this.#seo.updateEntityPage({
        name: venture.owner?.name ? `${venture.owner.name} - ${venture.name}` : venture.name,
        description: venture.description,
        path: `/entrepreneurs/${venture.slug}`,
        image: new ApiImgPipe().transform(venture, 'venture')
      });
    });
  }
}

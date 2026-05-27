export interface CarouselResponsiveOption {
  breakpoint: string;
  numVisible: number;
  numScroll: number;
}

export const carouselConfig: CarouselResponsiveOption[] = [
  { breakpoint: '1280px', numVisible: 3, numScroll: 1 },
  { breakpoint: '800px', numVisible: 2, numScroll: 1 },
  { breakpoint: '640px', numVisible: 1, numScroll: 1 }
];

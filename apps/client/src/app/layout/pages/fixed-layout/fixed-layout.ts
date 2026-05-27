import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppTopbar } from '../../components/app-topbar/app-topbar';
import { Footer } from '../../components/footer/footer';
import { BackButton } from '../../../shared/components/back-button/back-button';

@Component({
  selector: 'app-fixed-topbar-layout',
  templateUrl: './fixed-layout.html',
  imports: [RouterOutlet, Footer, AppTopbar, BackButton],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixedLayout {}

import { inject, Injectable } from '@angular/core';
import merge from 'lodash-es/merge';
import { BehaviorSubject, Observable } from 'rxjs';
import { APP_CONFIG } from './config.constants';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  #config = new BehaviorSubject(inject(APP_CONFIG));

  set config(value: unknown) {
    const config = merge({}, this.#config.getValue(), value);
    this.#config.next(config);
  }

  get config$(): Observable<unknown> {
    return this.#config.asObservable();
  }

  reset(): void {
    this.#config.next(this.config);
  }
}

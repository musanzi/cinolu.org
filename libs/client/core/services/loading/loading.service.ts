import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  #auto$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  #mode$: BehaviorSubject<'determinate' | 'indeterminate'> = new BehaviorSubject<'determinate' | 'indeterminate'>(
    'indeterminate'
  );
  #progress$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(0);
  #show$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  #urlMap: Map<string, boolean> = new Map<string, boolean>();

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for auto mode
   */
  get auto$(): Observable<boolean> {
    return this.#auto$.asObservable();
  }

  /**
   * Getter for mode
   */
  get mode$(): Observable<'determinate' | 'indeterminate'> {
    return this.#mode$.asObservable();
  }

  /**
   * Getter for progress
   */
  get progress$(): Observable<number | null> {
    return this.#progress$.asObservable();
  }

  /**
   * Getter for show
   */
  get show$(): Observable<boolean> {
    return this.#show$.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Show the loading bar
   */
  show(): void {
    this.#show$.next(true);
  }

  /**
   * Hide the loading bar
   */
  hide(): void {
    this.#show$.next(false);
  }

  /**
   * Set the auto mode
   *
   * @param value
   */
  setAutoMode(value: boolean): void {
    this.#auto$.next(value);
  }

  /**
   * Set the mode
   *
   * @param value
   */
  setMode(value: 'determinate' | 'indeterminate'): void {
    this.#mode$.next(value);
  }

  /**
   * Set the progress of the bar manually
   *
   * @param value
   */
  setProgress(value: number): void {
    if (value < 0 || value > 100) {
      console.error('Progress value must be between 0 and 100!');
      return;
    }

    this.#progress$.next(value);
  }

  /**
   * Sets the loading status on the given url
   *
   * @param status
   * @param url
   */
  _setLoadingStatus(status: boolean, url: string): void {
    // Return if the url was not provided
    if (!url) {
      console.error('The request URL must be provided!');
      return;
    }

    if (status === true) {
      this.#urlMap.set(url, status);
      this.#show$.next(true);
    } else if (status === false && this.#urlMap.has(url)) {
      this.#urlMap.delete(url);
    }

    // Only set the status to 'false' if all outgoing requests are completed
    if (this.#urlMap.size === 0) {
      this.#show$.next(false);
    }
  }
}

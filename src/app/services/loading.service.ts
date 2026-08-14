import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  private requestCount = 0;

  constructor() { }

  show(): void {
    this.requestCount++;
    this.loadingSubject.next(true);
  }

  hide(): void {
    if(this.requestCount > 0) {
      this.requestCount--;
    }
    if(this.requestCount === 0) {
      this.loadingSubject.next(false);
      setTimeout(() => {
        this.loadingSubject.next(false);
      }, 1000);
    }
  }
}

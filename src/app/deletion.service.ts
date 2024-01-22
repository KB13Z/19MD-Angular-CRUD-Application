import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeletionService {
  private deletionSuccessSubject = new BehaviorSubject<boolean>(this.getDeletionStatus());
  deletionSuccess$ = this.deletionSuccessSubject.asObservable();

  constructor() {}

  setDeletionSuccess(deletionSuccess: boolean) {
    this.deletionSuccessSubject.next(deletionSuccess);
    localStorage.setItem('deletionSuccess', JSON.stringify(deletionSuccess));
  }

  private getDeletionStatus(): boolean {
    const deletionStatus = localStorage.getItem('deletionSuccess');
    return deletionStatus ? JSON.parse(deletionStatus) : false;
  }
}

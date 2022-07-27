import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Account } from '../entities/account';
import { AccountDetail } from '../entities/account-detail';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  
  private accountSubject = new Subject<Account>();
  public dataAccount$: Observable<Account> = this.accountSubject.asObservable();

  private accountDetailSubject = new Subject<AccountDetail>();
  public dataAccountDetail$: Observable<AccountDetail> = this.accountDetailSubject.asObservable();

  private cancelAccountSubject = new Subject<boolean>();
  public cancelAccount$: Observable<boolean> = this.cancelAccountSubject.asObservable();

  constructor() { }

  public notifyAccount(account: Account){
    this.accountSubject.next(account);
  }

  public notifyAccountDetail(accountDetail: AccountDetail){
    this.accountDetailSubject.next(accountDetail);
  }

  public nofityCancellAccount(isCancelAccount: boolean){
    this.cancelAccountSubject.next(isCancelAccount);
  }

}

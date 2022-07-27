import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AccountDetail } from '../../entities/account-detail';
import { Account } from 'src/app/entities/account';

import { AccountService } from '../../services/account.service';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  account: Account;
  accountForm: FormGroup;
  accountDetails: AccountDetail[] = [];

  constructor(
    private accountService: AccountService,
    private communicationService: CommunicationService) { }

  ngOnInit(): void {

    this.communicationService.dataAccount$.subscribe(data => {
      this.account = data;
    })

    this.communicationService.dataAccountDetail$.subscribe(data => {
      this.accountDetails.push(data);
    })
  }

  /**
   * Permite registrar una factura
   */
   addAccount() {

    this.account.accountDetails = this.accountDetails;

    this.accountService.addAccount(this.account).subscribe(data => {
      this.accountDetails = [];

    });
  }

  /**
   * Permite cancelar una compra
   */
  cancelAccount(){
    this.account = null;
    this.accountDetails = [];
    this.communicationService.nofityCancellAccount(true);
  }

}

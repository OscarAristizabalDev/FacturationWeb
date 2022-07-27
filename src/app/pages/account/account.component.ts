import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DxSelectBoxComponent } from 'devextreme-angular';

import { Account } from 'src/app/entities/account';
import { Customer } from 'src/app/entities/customer';
import { Product } from '../../entities/product';

import { AccountDetail } from '../../entities/account-detail';
import { CommunicationService } from 'src/app/services/communication.service';
import { CustomerService } from '../../services/customer.service';



@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  @ViewChild('customer') customerSelect: DxSelectBoxComponent;

  customers: Customer[] = [];
  products: Product[] = [];
  accountDetails: AccountDetail[] = [];
  account: Account;
  // Formulario de facturas
  accountForm: FormGroup;
  customerIdControl: AbstractControl;
  accountDateControl: AbstractControl;

  // Formulario de productos
  accountDetailForm: FormGroup;
  productIdControl: AbstractControl;
  quantityControl: AbstractControl;
  priceProduct: number;
  total: number;

  prueba: string = "0";

  isAddProduct: boolean = false;

  constructor(
    private customerService: CustomerService,
    private communicationService: CommunicationService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildFormAccount();
    this.getAllCustomer();
  }

  /**
   * Permite consultar todos los clientes
   */
  getAllCustomer() {
    this.customerService.getAllCustomer().subscribe((data: Customer[]) => {
      this.customers = data;
    });
    this.communicationService.cancelAccount$.subscribe(value => {
      if(value) this.customerSelect.disabled = false;
    })
  }

  /**
   * Permite construir el formulario de facturas
   */
  buildFormAccount() {
    this.accountForm = this.formBuilder.group({
      customerId: ['', Validators.required],
      accountDate: ['', Validators.required]
    });
    this.customerIdControl = this.accountForm.controls['customerId'];
    this.accountDateControl = this.accountForm.controls['accountDate'];
  }

  /**
   * Permite agregar un cliente a la cuenta
   */
   saveCustomer({ value }: FormGroup) {
    this.account = new Account();
    this.account.customerId = value['customerId'];
    this.account.accountDate = value['accountDate'];
    this.customerSelect.disabled = true;

    this.communicationService.notifyAccount(this.account);
  }

}

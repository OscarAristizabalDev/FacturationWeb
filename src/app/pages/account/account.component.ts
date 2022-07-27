import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/entities/customer';
import { CustomerService } from '../../services/customer.service';
import { AccountService } from '../../services/account.service';
import { Account } from 'src/app/entities/account';
import { Product } from '../../entities/product';

import { ProductService } from '../../services/product.service';
import { AccountDetail } from '../../entities/account-detail';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

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
    private accountService: AccountService,
    private productService: ProductService,
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
   * Permite mostrar el formulario para agregar un producto
   */
  saveFormProduct({ value }: FormGroup) {
    this.account = new Account();
    this.account.customerId = value['customerId'];
    this.account.accountDate = value['accountDate'];
    this.isAddProduct = true;

    this.communicationService.notifyAccount(this.account);
  }

}

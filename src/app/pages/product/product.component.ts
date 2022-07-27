import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Account } from 'src/app/entities/account';
import { Product } from '../../entities/product';
import { AccountDetail } from '../../entities/account-detail';

import { ProductService } from '../../services/product.service';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  account: Account;

  products: Product[] = [];
  accountDetails: AccountDetail[] = [];

  accountDetailForm: FormGroup;
  productIdControl: AbstractControl;
  quantityControl: AbstractControl;

  prueba: string = "0";
  total: number;
  priceProduct: number;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private communicationService: CommunicationService) { 
    this.buildFormAccountDetail();
    this.getAllProduct(); 
  }

  ngOnInit(): void {
    this.communicationService.dataAccount$.subscribe(value => {
      this.account = value;
    })
  }

  /**
   * Permite construir el formulario del detalle de la factura
   */
   buildFormAccountDetail() {
    this.accountDetailForm = this.formBuilder.group({
      productId: ['', Validators.required],
      quantity: ['', Validators.required],
      total: ['', Validators.required],
    });
    this.productIdControl = this.accountDetailForm.controls['productId'];
    this.quantityControl = this.accountDetailForm.controls['quantity'];
  }

  /**
   * Permite consultar todos los productos
   */
   getAllProduct() {
    this.productService.getAllProduct().subscribe((data: Product[]) => {
      this.products = data;
      console.log(this.products);
    });
  }

  /**
   * Permite calcular el subtotal del producto agregado
   * @param e 
   */
   calculateSubTotal(e: any) {
    this.total = this.priceProduct * this.accountDetailForm.get('quantity').value;
  }

  /**
   * Permite agregar un producto a la factura
   * @param $event 
   * @param param1 
   */
   addProductAccount(e: any, { value }: FormGroup){
    
    
    let accountDetail = new AccountDetail();
    accountDetail.productId = value['productId'];
    accountDetail.quantity = value['quantity'];
    accountDetail.total = value['total'];
    accountDetail.productName = this.products.find(x => x.id == value['productId']).name;

    this.communicationService.notifyAccount(this.account);
    this.communicationService.notifyAccountDetail(accountDetail);
  }

  /**
   * Permite cancelar de agregar un producto a la factura
   * @param event 
   */
   cancelProductAccount(e: any){
    this.accountDetailForm.get("quantity").setValue(0);
  }

  /**
   * Permite buscar el precio del producto seleccionado
   * @param e 
   */
   onSelectProduct(e: any) {
    this.priceProduct = this.products.find(x => x.id == e.value).price;
    this.prueba = this.priceProduct.toString();
    this.accountDetailForm.get("quantity").setValue(0);
  }
}

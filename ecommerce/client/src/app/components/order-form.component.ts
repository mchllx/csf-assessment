import { Component, Input, OnInit, Output, inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Cart, LineItem, Product} from '../models';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { CartStore } from '../cart.store';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent implements OnInit {

  private prodSvc = inject(ProductService)
  private activatedRoute = inject(ActivatedRoute)
  private store = inject(CartStore)
  private fb = inject(FormBuilder)

  constructor(){ 
  }

  // NOTE: you are free to modify this component

  product!: Product
  lineItem!: LineItem
  finalLineItems: LineItem[] = []
  cart: Cart[] = []

  lineItems$!: Observable<LineItem[] | undefined>

  @Input({ required: true })
  productId!: string
  name!: string
  price!: number

  @Input()
  lineItems: LineItem[] = []
  
  @Output()
  newSubmit = new Subject<LineItem>
  
  form!: FormGroup

  ngOnInit(): void {
    this.form = this.createForm()
  }

  addToCart(li: LineItem) {
    // console.info('>>>order form:')

    this.lineItem = {
      prodId: this.productId,
      quantity: this.form.value['quantity'],
      name: this.name,
      price: this.price
    }

    // console.info('>>>from order lineitem', this.lineItem)

    this.newSubmit.next(this.lineItem)

    console.info('>>>size', this.lineItems.length)
    console.info('>>>values', this.lineItems)

    this.lineItem = {
      prodId: this.productId,
      quantity: this.form.value['quantity'],
      name: this.lineItems[0].name,
      price: this.lineItems[0].price
    }

    console.info('>>>final lineitem', this.lineItem)

    this.finalLineItems.push(this.lineItem)

    this.store.addToCart(this.finalLineItems)

    let cart: Cart[] = [{
        lineItems: this.finalLineItems
      }]
    
      this.cart = cart
      console.info('>>>added to cart', this.cart)

    this.form = this.createForm()
  }

  // updateCart(lineItems: LineItem[]) {
  //   console.log('check')
  //   lineItems = this.finalLineItems
    
  // }

  private createForm(): FormGroup {
    return this.fb.group({
      quantity: this.fb.control<number>(1, [ Validators.required, Validators.min(1) ])
    })
  }

}

import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LineItem, Cart, Order } from '../models';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrl: './confirm-checkout.component.css'
})
export class ConfirmCheckoutComponent implements OnInit, OnDestroy {

  // TODO Task 3

  private fb: FormBuilder = inject(FormBuilder)
  private prodSvc = inject(ProductService)
  private activatedRoute = inject(ActivatedRoute)

  form!: FormGroup

  order$!: Promise<void | undefined >

  @Input()
  cart!: Cart
  order!: Order
  
  constructor(){

  }


  ngOnInit(): void {
    this.form = this.createOrderForm()
  }

  ngOnDestroy(): void {
    this.form.reset()
  }

  private createOrderForm(): FormGroup {
    return this.fb.group({
      name: this.fb.control<string>('', [Validators.required, Validators.minLength(2)]),
      address: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      priority: this.fb.control<number>(parseInt('')),
      comments: this.fb.control<string>('', [Validators.maxLength(120)])
    })
  }


  // { name: 'name', address: 'address', priority: true, comments: 'text'}
  // name: string
  // address: string
  // priority: boolean
  // comments: string
  // cart: Cart

  postOrder():void {
    console.log("order")
    const order = this.form.value

    console.log('>>>', order)

    this.order = {
      name: this.form.value['name'],
      address: this.form.value['address'],
      priority: this.form.value['priority'],
      comments: this.form.value['comments'],
      cart: this.cart 
    }

    console.log('>>>sending to sb', this.order)
    
    this.order$ = this.prodSvc.checkout(this.order)
    .then(
      value => {
        console.log('awaiting response from server')

        alert(`successful: ${value.name}, ${value.cart}`);

        console.log('>>>ang: successful', value)
      })
      .catch(
        error => {
          console.log('server error', error)
          alert('server error: failed to place order')
        }
      )
    
  }
  
}

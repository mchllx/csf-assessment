import { Component, Input, OnInit, Output, inject } from '@angular/core';
import {Observable, Subject, of, switchMap, tap} from 'rxjs';
import {Cart, LineItem, Product} from '../models';
import {ProductService} from '../product.service';
import {ActivatedRoute} from '@angular/router';
import { CartStore } from '../cart.store';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  // NOTE: you are free to modify this component

  private prodSvc = inject(ProductService)
  private activatedRoute = inject(ActivatedRoute)
  private store = inject(CartStore)

  category: string = "not set"

  products$!: Observable<Product[] | undefined>
  products: Product[] = []
  // cart!: Cart

  @Input()
  lineItem!: LineItem
  // lineItem!: LineItem
  lineItems: LineItem[] = []

  lineItems$!: Observable<LineItem[] | undefined>

  @Output()
  sendLineItem = new Subject<LineItem[]>()

  constructor(){ 
  }

  ngOnInit(): void {
    this.category = this.activatedRoute.snapshot.params['category']
    // this.products$ = this.prodSvc.getProductsByCategory(this.category)

    this.products$ = this.prodSvc.getProductsByCategory(this.category)
    .pipe(
      switchMap((value: Product[]) => {

        if (value === undefined ) {
          return of(undefined)

        } else {
          for (let index=0; index < value.length; index++) {
            const p = value[index]

            // console.info('>>>retrieving product', p)

            this.products.push(p)

            // console.info('>>>retrieving data', this.products) 
          }
        }
        return of(value)
      }),

      tap(value => {
        // console.info('>>> value', value)
      })
    )
  }

  newLineItem(li: LineItem) {
    // console.log('check', this.product.length)
    console.log('receiving data from order form', li)

    for (let index = 0; index < this.products.length; index++) {
      const p = this.products[index];

      if (p.prodId === li.prodId) {
        console.info('>>>found prodId')

        let lineItem: LineItem = {
          prodId: li.prodId,
          quantity: li.quantity,
          name: p.name,
          price: p.price
        }

        console.log('>>>adding lineitem to cart', lineItem)
        this.lineItem = lineItem
        
        this.lineItems.push(lineItem)
        console.log('>>>adding to lineitems', this.lineItems)
      }
    }
  }
}

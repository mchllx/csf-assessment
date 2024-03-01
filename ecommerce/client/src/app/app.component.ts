import { AfterViewInit, Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import {Observable, of, switchMap, tap} from 'rxjs';
import {Router} from '@angular/router';
import { Cart, LineItem } from './models';
import { CartStore } from './cart.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  
  // ngAfterViewInit(): void {
  //   console.info('>>>initialising viewchild')
  //   this.itemCount = 0
  // }

  // NOTE: you are free to modify this component

  itemCount: number = 0
  itemCount$!: Observable<number | undefined >

  private router = inject(Router)
  private store = inject(CartStore)
  public disable: boolean = true
  
  @Input()
  cart!: Cart


  // @ViewChild('itemCount') set itemCount(newCount: number) {
  //   // console.log("loading item count")
  //   this.itemCount = newCount
  //   this.itemCount = this.cart.lineItems.length

  //   if (this.itemCount > 0) {
  //     this.disable = false
  //   }
  // }

  ngOnInit(): void {
    this.itemCount$ = this.store.getItemCount.pipe(
      switchMap((value: number) => {

        if (value === undefined ) {
          return of(undefined)
        }

          const newCount = value

          console.info('>>>retrieving count', newCount)
          this.itemCount = newCount

        return of(this.itemCount) 
      }),

      tap(value => {
        console.info('>>> itemcount', value)
      })
    )
  
  }

  checkout(itemCount: number) {

    if (itemCount <= 0) {
      alert('cart is empty')
      this.disable = true
    } else {
      this.router.navigate([ '/checkout' ])
    }
   
  }
}

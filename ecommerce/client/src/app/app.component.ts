import { AfterViewInit, Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { Cart } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit, AfterViewInit {
  
  ngAfterViewInit(): void {
    console.info('>>>initialising viewchild')
    this.itemCount = 0
  }

  // NOTE: you are free to modify this component

  // itemCount!:number

  private router = inject(Router)
  public disable: boolean = true
  
  @Input()
  cart!: Cart

  // private itemCount!: number

  @ViewChild('itemCount') set itemCount(newCount: number) {
    // console.log("loading item count")
    this.itemCount = newCount
    this.itemCount = this.cart.lineItems.length

    if (this.itemCount > 0) {
      this.disable = false
    }
  }

  ngOnInit(): void {
    this.itemCount = 0
  }

  checkout(): void {
    if (this.itemCount <= 0) {
      alert('cart is empty')
    }

    this.router.navigate([ '/checkout' ])
  }
}

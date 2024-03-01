// TODO Task 2
// Use the following class to implement your store
import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";

import {Cart, LineItem, Product} from "./models";

@Injectable()
export class CartStore extends ComponentStore<Cart> {

    product!: Product
    cart: Cart = {
        lineItems: []
    }

    constructor(cart: Cart) {
        super(cart)
        this.cart = cart
    }

    // upon successfully add, item count increases
    // readonly product$ = this.select<Product>(
    //     (product) => ({ ...product } as Product)
    // )

    // readonly product$ = this.updater<Product> {
    //     (product) => ({ ...product} as Product)
    // }

     // sent to SB after checkout
    
    

}
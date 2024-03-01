// TODO Task 2
// Use the following class to implement your store
import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";

import {Cart, LineItem, Product} from "./models";

@Injectable({
    providedIn: 'root'
})
        
export class CartStore extends ComponentStore<Cart> {

    // private INIT_STATE: Cart = {
    //     lineItems: []
    // }

    cart!: Cart[]

    constructor() {
        super(
            {lineItems: []}
        )
    }

    // readonly lineItems$: Observable<LineItem[]> = this.select(state => state.lineItems);

    readonly getAllItems = this.select<LineItem[]>(
        (slice: Cart) => slice.lineItems
        )

    readonly getItemCount = this.select<number>(
    (slice: Cart) => slice.lineItems.length
    )

    public readonly addToCart = this.updater<LineItem[]>(
            (slice: Cart, lineItems: LineItem[]) => 
            ({
            ...slice, lineItems,
      }));

}

    
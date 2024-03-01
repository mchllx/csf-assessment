import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";

import {Product} from "./models";

@Injectable()
export class ProductStore extends ComponentStore<Product> {

    // sent to SB after checkout 

}
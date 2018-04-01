import { Injectable } from "@angular/core";
import { Product } from "../shared/models/product";
import Products from '../shared/data/products';

@Injectable()
export class ProductsService {
    getProducts(): Product[] {
        return Products;
    }

    getProduct(productId: number) {
        return Products.find((prod: Product) => prod.productId == productId);
    }
}
import { Injectable } from "@angular/core";
import { Product } from "../shared/models/product";
import Products from '../shared/data/products';

@Injectable()
export class ProductsService {
    getProducts(): Product[] {
        return Products;
    }

    getProduct(productId: number) {
        var foundProduct: Product = Products.find((prod: Product) => prod.productId == productId);
        return foundProduct;
    }
}
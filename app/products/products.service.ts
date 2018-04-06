import { Injectable } from "@angular/core";
import { IProduct } from "../shared/models/product";
import Products from '../shared/data/products';

@Injectable()
export class ProductsService {
    getProducts(): IProduct[] {
        return Products;
    }

    getProduct(productId: number) {
        var foundProduct: IProduct = Products.find((prod: IProduct) => prod.productId == productId);
        return foundProduct;
    }
}
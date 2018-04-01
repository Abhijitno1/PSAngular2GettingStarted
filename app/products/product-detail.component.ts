import { Component, OnInit } from "@angular/core";
import { ProductsService } from "./products.service";
import { Product } from '../shared/models/product';

@Component({
    selector: 'product-detail',
    templateUrl: './app/products/product-detail.component.html'    
})
export class ProductDetailComponent implements OnInit {
    pageTitle: string= 'Product Details';
    product: Product;

    constructor(private _productsSvc: ProductsService) {}

    ngOnInit() {
        this.product = this._productsSvc.getProduct(1);
    }

    onBack() {
        console.log('back button clicked');
    }
}
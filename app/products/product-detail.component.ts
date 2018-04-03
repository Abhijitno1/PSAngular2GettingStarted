import { Component, OnInit } from "@angular/core";
import { ProductsService } from "./products.service";
import { Product } from '../shared/models/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: './app/products/product-detail.component.html'    
})
export class ProductDetailComponent implements OnInit {
    pageTitle: string= 'Product Details';
    product: Product;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _productsSvc: ProductsService
    ) {}

    ngOnInit(): void {
        const param: string= this._route.snapshot.params.id;
        const id = +param;  //+ converts string to int
        this.product = this._productsSvc.getProduct(id);
    }

    onBack(): void {
        this._router.navigate(['/products']);
    }
}
import { Component, OnInit } from "@angular/core";
import { ProductsService } from "./products.service";
import { IProduct } from '../shared/models/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: './app/products/product-detail.component.html'    
})
export class ProductDetailComponent implements OnInit {
    pageTitle: string= 'Product Details';
    product: IProduct;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _productsSvc: ProductsService
    ) {}

    ngOnInit(): void {
        const param: string= this._route.snapshot.params['id'];
        const id = +param;  //+ converts string to int
        this._productsSvc.getProduct(id).subscribe(
            prod => {
                //console.log('foundProduct', prod); 
                if (!prod) {
                    alert('Product not found');
                    this._router.navigate(['/products']);
                }
                this.product = prod 
            },
            err => alert('AJAX error occurred: ' + err)
        );
    }

    onBack(): void {
        this._router.navigate(['/products']);
    }
}
import { Component, OnInit} from '@angular/core';
import { Product } from '../shared/models/product';
import Products from '../shared/data/products';

@Component({
    selector: 'product-list',
    templateUrl: './app/products/product-list.component.html',
    styleUrls: ['./app/products/product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string= 'Products List';
    imageWidth: number= 50;
    imageMargin: number= 2;
    showImage: boolean= false;
    errorMessage: string= "";
    products: Product[];

    ngOnInit() {
        console.log('Abhijit: OnInit was called');
        this.products= Products;
    }

    toggleImage() {
        this.showImage = !this.showImage;
    }
}
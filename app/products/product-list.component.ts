import {Component} from '@angular/core';
import { User } from '../shared/models/user';

@Component({
    selector: 'product-list',
    templateUrl: './app/products/product-list.component.html'
})
export class ProductListComponent {
    pageTitle: string= 'Products List';
    imageWidth: number= 64;
    imageHeight: number= 32;

    products: any[]= [{
        "productId": 1,
        "productName": "Leaf Rake",
        "productCode": "GDN-0011",
        "releaseDate": "March 19, 2016",
        "description": "Leaf rake with 48-inch wooden handle.",
        "price": 19.95,
        "starRating": 3.2,
        "imageUrl": "assets/images/base_asterick_32.png"

    },
    {
        "productId": 2,
        "productName": "Garden Cart",
        "productCode": "GDN-0023",
        "releaseDate": "March 18, 2016",
        "description": "15 gallon capacity rolling garden cart",
        "price": 32.99,
        "starRating": 4.2,
        "imageUrl": "assets/images/base_bubble.png"
    }];
}
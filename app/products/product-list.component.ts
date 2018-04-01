import { Component, OnInit} from '@angular/core';
import { Product } from '../shared/models/product';
import { ProductsService} from './products.service';

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
    products: Product[]= [];
    filteredProducts: Product[];
    private _listFilter: string;

    constructor(private _productsSvc: ProductsService) {}

    get listFilter() { return this._listFilter; }

    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter? this.applyFilter(value): this.products;       
    }

    ngOnInit() {
        console.log('Abhijit: OnInit was called');
        this.filteredProducts= this.products= this._productsSvc.getProducts();
    }

    toggleImage() {
        this.showImage = !this.showImage;
    }

    applyFilter(filterBy: string): Product[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: Product) => 
            product.productName.toLocaleLowerCase().indexOf(filterBy) > -1);
    }

    onRatingClick(message: string): void {
        this.pageTitle = `Products List: ${message}`;
    }
}
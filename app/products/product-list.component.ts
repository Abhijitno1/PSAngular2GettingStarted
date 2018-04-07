import { Component, OnInit} from '@angular/core';
import { IProduct } from '../shared/models/product';
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
    products: IProduct[]= [];
    filteredProducts: IProduct[];
    sortColumn: string= null;
    sortOrder: number= 0;
    private _listFilter: string;

    constructor(private _productsSvc: ProductsService) {}

    get listFilter() { return this._listFilter; }

    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter? this.applyFilter(value): this.products;       
    }

    ngOnInit() {
        //console.log('Abhijit: OnInit was called');
        this._productsSvc.getProducts().subscribe(
            allProds => this.filteredProducts = this.products = allProds,
            error => this.errorMessage = error
        );
    }

    toggleImage() {
        this.showImage = !this.showImage;
    }

    applyFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => 
            product.productName.toLocaleLowerCase().indexOf(filterBy) > -1);
    }

    onRatingClick(message: string): void {
        this.pageTitle = `Products List: ${message}`;
    }

    onColumnSort(evtArgs): void {
        this.sortColumn = evtArgs.columnName;
        this.sortOrder = evtArgs.isDesc? 1 : -1;
        //alert(evtArgs.columnName + ' is clicked, isDesc = ' + evtArgs.isDesc);        
    }
    //http://www.advancesharp.com/blog/1211/angular-2-search-and-sort-with-ngfor-repeater-with-example
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
}
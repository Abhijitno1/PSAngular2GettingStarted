import { Component, OnInit } from '@angular/core';
import { IListItem } from '../shared/models/list-item';
import { IProduct } from '../shared/models/product';
import { ProductsService} from '../products/products.service';

//This is a container view to hold picker widget components

@Component({
    selector: 'picker-widgets',
    template: `
        <h3>Custom Dropdown Components</h3>
        <div>
            <p>
                <strong>Selected Product: </strong> {{selectedProduct?.productName || 'None Selected'}}
                &mdash; <button class="btn btn-info" (click)="selectedProduct= null">Clear Selection</button>
            </p>
            <html-combo [items]="products" placeholder="Select a Product" [(selectedItem)]="selectedProduct">
                <template let-listItem="item">
                    <img [src]="listItem.imageUrl" style="width:30px;margin:2px 5px;"/>
                    {{listItem.productName + ' (' + listItem.productCode + ')'}}
                </template>
            </html-combo>
            <hr />
            <p>
                <strong>Selected Items: </strong> {{mulChkCbo.displayText}} 
                &mdash; <button class="btn btn-info" (click)="unselectSubjects()">Clear Selection</button>
            </p>
            <multi-check-combo #mulChkCbo [items]="subjects"></multi-check-combo>
        </div>
    `
})
export class PickerWidgetsComponent implements OnInit {
    /*products: IListItem[]= [
        { value: 'html', text: 'HTML' },
        { value: 'css', text: 'CSS' },
        { value: 'javascript', text: 'JavaScript' }
    ];*/
    selectedProduct: IProduct;
    products: IProduct[]= [];
    ajaxError: string= '';

    constructor(private prodSvc: ProductsService) {}

    ngOnInit() {
        this.prodSvc.getProducts().subscribe(
            result=> this.products= result,
            error => this.ajaxError= error
            //, ()=> console.log('products count', this.products.length)
        );
    }

    subjects: IListItem[]= [
        { value: 'html', text: 'HTML' },
        { value: 'css', text: 'CSS' },
        { value: 'javascript', text: 'JavaScript' }
    ];

    unselectSubjects() {
        this.subjects.forEach(sub => sub.isSelected= false);
        //console.debug(this.subjects);
    }
}
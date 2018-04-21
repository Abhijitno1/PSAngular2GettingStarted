import { Component } from '@angular/core';
import { IListItem } from '../shared/models/list-item';
//This is a container view to hold picker widget components

@Component({
    selector: 'picker-widgets',
    template: `
        <h3>Custom Dropdown Components</h3>
        <div>
            <p>
                <strong>Selected Product: </strong> {{selectedProduct?.text || 'None Selected'}}
                &mdash; <button class="btn btn-info" (click)="clearSelection()">Clear Selection</button>
            </p>
            <html-combo [items]="products" placeholder="Select a Product" [(selectedItem)]="selectedProduct">
                <template let-listItem="item">
                    {{listItem.text + ' (' + listItem.value + ')'}}
                </template>
            </html-combo>
        </div>
    `
})
export class PickerWidgetsComponent {
    products: IListItem[]= [
        { value: 'html', text: 'HTML' },
        { value: 'css', text: 'CSS' },
        { value: 'javascript', text: 'JavaScript' }
    ];
    selectedProduct: IListItem;
    clearSelection() {
        this.selectedProduct= null;
    }
}
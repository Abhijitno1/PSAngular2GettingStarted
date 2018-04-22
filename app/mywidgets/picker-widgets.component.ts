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
                &mdash; <button class="btn btn-info" (click)="selectedProduct= null">Clear Selection</button>
            </p>
            <html-combo [items]="products" placeholder="Select a Product" [(selectedItem)]="selectedProduct">
                <template let-listItem="item">
                    {{listItem.text + ' (' + listItem.value + ')'}}
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
export class PickerWidgetsComponent {
    products: IListItem[]= [
        { value: 'html', text: 'HTML' },
        { value: 'css', text: 'CSS' },
        { value: 'javascript', text: 'JavaScript' }
    ];
    selectedProduct: IListItem;

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
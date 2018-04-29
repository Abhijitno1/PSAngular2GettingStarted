import { Component, OnInit, ViewChild } from '@angular/core';
import { IListItem } from '../shared/models/list-item';
import { IProduct } from '../shared/models/product';
import { ProductsService } from '../products/products.service';
import { TreeDataService } from '../services/tree-data.service';
import { TreeComboComponent } from '../shared/widgets/tree-combo.component';
import { Tree } from '@angular/router/src/utils/tree';
import { TreeNode } from '../shared/models/tree-node';

//This is a container view to hold picker widget components

@Component({
    selector: 'picker-widgets',
    template: `
        <h3>Custom Dropdown Components</h3>
        <div>
            <h4>Html List Picker</h4>
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
            <h4>Multiselect List Picker with checkbox</h4>
            <p>
                <strong>Selected Items: </strong> {{mulChkCbo.displayText}} 
                &mdash; <button class="btn btn-info" (click)="unselectSubjects()">Clear Selection</button>
            </p>
            <multi-check-combo #mulChkCbo [items]="subjects"></multi-check-combo>
            <hr />
            <h4>Multiselect Tree Picker with checkbox</h4>
            <p>
                <button class="btn btn-info" (click)="getSelectedTreeValues()">Get Selected Values</button>
                <button class="btn btn-info" (click)="clearSelectedTreeValues()">Clear Selected Values</button>
            </p>
            <tree-combo #treeCombo [treeData]="treeData"></tree-combo>
            <!--Below treecombo methods cannot be used in interpolation-->
            <!--span>selected items: {{treeCombo.getSelectedItems()}}</span-->
        </div>
    `
})
export class PickerWidgetsComponent implements OnInit {
    selectedProduct: IProduct;
    products: IProduct[]= [];
    @ViewChild(TreeComboComponent) treePicker: TreeComboComponent;
    treeData: TreeNode= new TreeNode(0, "Default Root");
    ajaxError: string= '';

    constructor(private prodSvc: ProductsService,  private treedataSvc: TreeDataService) {}

    ngOnInit() {
        this.prodSvc.getProducts().subscribe(
            result=> this.products= result,
            error => this.ajaxError= error
            //, ()=> console.log('products count', this.products.length)
        );
        this.treeData= this.treedataSvc.getTreeData()
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

    getSelectedTreeValues() {
        var selItems = this.treePicker.getSelectedItems();
        alert('Selected values: ' + (selItems.length>0? selItems.join(','): 'none'));
    }
    clearSelectedTreeValues() {
        this.treePicker.setSelectedItems([]);
    }
}
import { Component, AfterViewInit, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { TreeViewComponent } from './tree-view.component';
import { TreeNode } from '../models/tree-node';

@Component({ 
    selector: 'tree-combo',
    inputs: ['treeData', 'placeholder'],
    outputs: ['itemClicked'],
    template: `
        <div class="dropdown">
            <div class="display-text" type="button" (click)="toggleList($event)">
                {{displayText}}
                <span class="caret"></span>
            </div>
            <ul #dropdownList class="dropdown-menu combo-list" [style.display]="listDisplay">
                <li>
                    <tree-view [node]="treeData" (itemClicked)="treeNodeClicked($event)"></tree-view> 
                </li>
            </ul>
        </div>
    `,
    styles: [
        `.display-text {
            display: inline-block;
            min-width: 160px;
            border: 1px solid rgba(0, 0, 0, 0.15);
            border-radius: 4px;
            padding: 3px 20px;
        }`
        /*,'.caret { float: right; padding-top: 5px; }'*/
    ]
})
export class TreeComboComponent implements AfterViewInit {
    public treeData: TreeNode= new TreeNode(0, "Default Root");
    public itemClicked: EventEmitter<any>= new EventEmitter();
    @ViewChild(TreeViewComponent) private treeViewCtrl: TreeViewComponent;
    //https://stackoverflow.com/questions/44047713/angular-2-how-to-get-htmlelement-elementref-of-child-component-using-templat
    @ViewChild(TreeViewComponent, { read: ElementRef }) private treeViewElm: ElementRef;

    listDisplay: string= "none";
    placeholder: string= "Select a value";
    displayText: string= this.placeholder;
    constructor(private changeDetector: ChangeDetectorRef) {}

    ngAfterViewInit() {
        var me= this;
        document.addEventListener('click', function() {
            me.listDisplay= "none";
            me.changeDetector.detectChanges();
        });
        this.treeViewElm.nativeElement.addEventListener('click', function() {
            window.event.stopPropagation();
            window.event.preventDefault();
        });
    }

    toggleList(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        this.listDisplay= this.listDisplay=='none'? 'block': 'none';
    }

    treeNodeClicked(node) {
        this.updateDisplayText();
    }

    public getSelectedItems(): number[] {
        if (!this.treeData || !this.treeViewCtrl) return [];
        return this.treeViewCtrl.getCheckedValues();
    }
    /*private set selectedItems(values: number[]) {
        this.treeViewCtrl.CheckedValues= values;
    }*/
    private updateDisplayText() {
        //Converting displayText to property helps to automatically update it when selected items collection changes
        let selItems= this.getSelectedItems();
        if (selItems.length > 0)
            this.displayText= selItems.join(', ');
        else
        this.displayText= this.placeholder;
    }
}
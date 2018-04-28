import { Component, AfterViewInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { IListItem } from '../models/list-item';

@Component({ 
    selector: 'tree-combo',
    inputs: ['items', 'placeholder'],
    outputs: ['itemClicked'],
    template: `
        <div class="dropdown">
            <div class="display-text" type="button" (click)="toggleList($event)">
                {{displayText}}
                <span class="caret"></span>
            </div>
            <ul #dropdownList class="dropdown-menu combo-list" *ngIf="showList">
                <li>
                    Here will reside the treeview control
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
        }`,
        `.dropdown .dropdown-menu.combo-list {
            display: block;
        }`
        /*,'.caret { float: right; padding-top: 5px; }'*/
    ]
})
export class TreeComboComponent implements AfterViewInit {
    public items: IListItem[]= [];
    public itemClicked: EventEmitter<any>= new EventEmitter();

    showList: boolean= false;
    placeholder: string= "Select a value";
    public get displayText() {
        //Converting displayText to property helps to automatically update it when selected items collection changes
        let selItems= this.getSelectedItems();
        if (selItems.length > 0)
            return selItems.map(item=> item.text).join(', ');
        else
            return this.placeholder;
    }

    public get selectedItems(): IListItem[] {
        return this.getSelectedItems();
    }

    constructor(private changeDetector: ChangeDetectorRef) {}

    ngAfterViewInit() {
        var me= this;
        document.addEventListener('click', function() {
            me.showList= false;
            me.changeDetector.detectChanges();
        });
    }

    toggleList(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        this.showList= !this.showList;
    }

    private toggleSelect(item: any, evt): void {
        item.isSelected = !item.isSelected;
        this.itemClicked.emit(item);
        evt.stopPropagation();
        evt.preventDefault();
    }

    private getSelectedItems(): IListItem[] {
        if (!this.items) return [];
        return this.items.filter(item => item.isSelected==true);
    }
}
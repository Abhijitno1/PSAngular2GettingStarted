import { Component, AfterViewInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { IListItem } from '../models/list-item';

@Component({ 
    selector: 'multi-check-combo',
    template: `
        <div class="dropdown">
            <div class="display-text" type="button" (click)="toggleList($event)">
                {{displayText}}
                <span class="caret"></span>
            </div>
            <ul #dropdownList class="dropdown-menu" [style.display]="listHidden">
                <li *ngFor="let item of items" [ngClass]="{active: item.isSelected}">
                    <a href="javascript:void(0)" (click)="toggleSelect(item, $event)">
                        <span *ngIf="item.isSelected">
                            <i class="glyphicon glyphicon-check"></i>
                        </span>
                        <span *ngIf="!item.isSelected">
                            <i class="glyphicon glyphicon-unchecked"></i>
                        </span>
                        {{item.text}}
                    </a>
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
export class MultiCheckComboComponent implements AfterViewInit {
    @Input() items: IListItem[]= [];
    @Output() itemClicked: EventEmitter<any>= new EventEmitter();

    listHidden: string= "none";
    placeholder: string= "Select a value";
    public get displayText() {
        //Converting displayText to property helps to automatically update it when selected items collection changes
        //console.log('hit pe hit.. lagataar');
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
            me.listHidden= "none";
            me.changeDetector.detectChanges();
        });
    }

    toggleList(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        this.listHidden= this.listHidden=="none" ? "block": "none";
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
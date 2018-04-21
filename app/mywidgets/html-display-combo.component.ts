import { Component, EventEmitter, ChangeDetectorRef, TemplateRef, OnChanges, 
    AfterViewInit, SimpleChanges, ContentChild } from '@angular/core';
import { IListItem } from '../shared/models/list-item';
//https://www.bennadel.com/blog/3116-using-an-item-template-with-an-html-dropdown-menu-component-in-angular-2-rc-3.htm

@Component({ 
    selector: 'html-combo',
    inputs: ['items', 'selectedItem', 'placeholder'],
    outputs: ['selectedItemChange'],
    // Query for the template being provided by the calling context.
    queries: {
        itemTemplate: new ContentChild(TemplateRef)
    },
    host: {
        '[class.isOpen]': 'listHidden=="block"'
    },
    template: `
        <div class="dropdown">
            <div class="display-text" (click)="toggleList($event)" [ngSwitch]="!!value">
                <div *ngSwitchCase="true">
                    <template
                        [ngTemplateOutlet]="itemTemplate"
                        [ngOutletContext]="{item: value, index: selectedIndex}">
                    </template>
                </div>
                <div *ngSwitchCase="false">
                    {{placeholder || 'Nothing Selected'}}
                </div>
                <span class="caret"></span>
            </div>
            <ul #dropdownList class="dropdown-menu" [style.display]="listHidden">
                <li *ngFor="let item of items; let i= index" (click)="itemClicked(i)" [ngClass]="{active: i==selectedIndex}">
                    <template
                        [ngTemplateOutlet]="itemTemplate"
                        [ngOutletContext]="{item: item, index: index}">
                    </template>
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
        `.display-text>div {
            display: inline-block;
        }`,
        `.dropdown-menu li {
            cursor: pointer;
            padding: 3px 20px;
            clear: both;
        }`,
        `.dropdown-menu li:hover {
            background-color: #f5f5f5;
        }`,
        `.dropdown-menu li.active {
            color: #fff;
            background-color: #337ab7;
        }`
        /*,'.caret { float: right; padding-top: 5px; }'*/
    ]
})
export class HtmlDisplayComboComponent implements AfterViewInit, OnChanges {
    public items: IListItem[]= [];
    public placeholder: string= "Select a value";
    public selectedItem: IListItem;
    public selectedItemChange: EventEmitter<any>= new EventEmitter();

    listHidden: string= "none";
    selectedIndex: number= -1; //To be enhanced by converting to property

    constructor(private changeDetector: ChangeDetectorRef) {}

    ngOnChanges(changes: SimpleChanges) {
        /*for (let propName in changes) {
            if (propName=='selectedItem') {
                let selItem= <IListItem>changes[propName].currentValue;
                console.log('captured change', selItem);
                this.selectedIndex= this.items.findIndex(curItm=> curItm.value==selItem.value);
            }
        }*/
    }

    ngAfterViewInit() {
        var me= this;
        document.onclick= function() {
            //Manually trigger change detection cycle as onclick event is not automatically recognized
            //https://stackoverflow.com/questions/34827334/triggering-change-detection-manually-in-angular
            me.listHidden= "none";
            me.changeDetector.detectChanges();
        }
    }

    toggleList(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        this.listHidden= this.listHidden=="none" ? "block": "none";
    }

    private itemClicked(i: number): void {
        let originalIndex= this.selectedIndex;
        this.selectedIndex= i;
        this.selectedItem= this.items[i];
        this.placeholder= this.items[i].text;
        this.listHidden= "none";
        /*this.valueChange.emit({
            selectedIndex: this.selectedIndex,
            originalIndex: originalIndex
        });*/
        this.selectedItemChange.emit(this.selectedItem);
    }
}
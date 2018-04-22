import { Component, EventEmitter, ChangeDetectorRef, TemplateRef, OnChanges, DoCheck, 
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
        '[class.isOpen]': 'listDisplay=="block"'
    },
    templateUrl: './app/mywidgets/html-display-combo.component.html',
    styleUrls: ['./app/mywidgets/html-display-combo.component.css']
})
export class HtmlDisplayComboComponent implements AfterViewInit, OnChanges, DoCheck {
    public items: IListItem[]= [];
    public placeholder: string= "Select a value";
    public selectedItem: IListItem;
    public selectedItemChange: EventEmitter<any>= new EventEmitter();

    listDisplay: string= "none";
    private selectedIndex: number= -1; //To be enhanced by converting to property
    private selIndexChange: boolean= false;

    constructor(private changeDetector: ChangeDetectorRef) {}

    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {
            if (propName=='selectedItem') {
                //let selItem= <IListItem>changes[propName].currentValue;
                this.selIndexChange= true;
            }
        }
    }

    ngDoCheck() {
        //https://www.tektutorialshub.com/angular-ngdocheck-life-cycle-hook/
        var me= this;
        setTimeout(() => {
            if (me.selIndexChange===true) {
                me.selectedIndex= me.items.findIndex(curItm=> curItm==me.selectedItem);
                //console.log('selectedIndex', me.selectedIndex);
                me.selIndexChange= false;
            }
        }, 100);
    }

    ngAfterViewInit() {
        var me= this;
        document.onclick= function() {
            //Manually trigger change detection cycle as onclick event is not automatically recognized
            //https://stackoverflow.com/questions/34827334/triggering-change-detection-manually-in-angular
            me.listDisplay= "none";
            me.changeDetector.detectChanges();
        }
    }

    toggleList(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        this.listDisplay= this.listDisplay=="none" ? "block": "none";
    }

    private itemClicked(i: number): void {
        let originalIndex= this.selectedIndex;
        this.selectedIndex= i;
        this.selectedItem= this.items[i];
        this.listDisplay= "none";
        this.selectedItemChange.emit(this.selectedItem);
    }
}
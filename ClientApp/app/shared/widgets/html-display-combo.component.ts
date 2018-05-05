import { Component, EventEmitter, ChangeDetectorRef, TemplateRef, OnChanges, DoCheck, 
    AfterViewInit, SimpleChanges, ContentChild } from '@angular/core';
//import { IListItem } from '../models/list-item';
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
    //moduleId: module.id,
    //templateUrl: 'html-display-combo.component.html',
    templateUrl: './app/shared/widgets/html-display-combo.component.html',
    styleUrls: ['./app/shared/widgets/html-display-combo.component.css']
})
export class HtmlDisplayComboComponent implements AfterViewInit, OnChanges, DoCheck {
    public items: any[]= [];
    public placeholder: string= "Select a value";
    public selectedItem: any;
    public selectedItemChange: EventEmitter<any>= new EventEmitter();

    listDisplay: boolean= false;
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
        //Also read alternative methods to use collection/object watchers in Angular2+ in above article
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
        document.addEventListener('click', function() {
            //Manually trigger change detection cycle as onclick event is not automatically recognized
            //https://stackoverflow.com/questions/34827334/triggering-change-detection-manually-in-angular
            me.listDisplay= false;
            me.changeDetector.detectChanges();
        });
    }

    toggleList(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        this.listDisplay= !this.listDisplay;
    }

    private itemClicked(i: number): void {
        let originalIndex= this.selectedIndex;
        this.selectedIndex= i;
        this.selectedItem= this.items[i];
        this.listDisplay= false;
        this.selectedItemChange.emit(this.selectedItem);
    }
}
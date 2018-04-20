import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IListItem } from '../shared/models/list-item';

@Component({ 
    selector: 'html-combo',
    template: `
        <div class="dropdown">
            <button class="btn btn-primary dropdown-toggle display-text" type="button" (click)="toggleList($event)">
            {{selectedText}}
            <span class="caret"></span></button>
            <ul #dropdownList class="dropdown-menu" [style.display]="listHidden">
                <li *ngFor="let item of items; let i= index" (click)="itemClicked(i)" [ngClass]="{active: i==selectedIndex}">
                    <a href="javascript:void(0)" value={{item.value}}>{{item.text}}</a>
                </li>
            </ul>
        </div>
    `,
    styles: ['.display-text {min-width: 160px;']
})
export class HtmlDisplayComboComponent implements OnInit {
    //@ViewChild('dropdownList') dropdownList: ElementRef;
    @Input() items: IListItem[]= [
        { value: 'html', text: 'HTML' },
        { value: 'css', text: 'CSS' },
        { value: 'javascript', text: 'JavaScript' }
    ];
    @Output() itemSelected: EventEmitter<any>= new EventEmitter();

    listHidden: string= "none";
    selectedText: string= "Select a value";
    selectedValue: string= null; //To be enhanced by converting to property
    selectedIndex: number= -1; //To be enhanced by converting to property

    ngOnInit() {
        var me= this;
        document.onclick= function() {
            //console.log('blur event captured');
            //ToDo: Check why changing listhidden does not produce effect in this event
            me.listHidden= "none";
        }
    }

    toggleList(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        this.listHidden= this.listHidden=="none" ? "block": "none";
    }

    private itemClicked(i: number): void {        
        this.selectedIndex= i;
        this.selectedValue= this.items[i].value;
        this.selectedText= this.items[i].text;
        this.listHidden= "none";
        this.itemSelected.emit({
            selectedIndex: this.selectedIndex, 
            selectedValue: this.selectedValue
        });
    }
}
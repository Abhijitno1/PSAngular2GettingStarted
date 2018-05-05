import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'sort-col-header',
    template: `
    <i class="glyphicon"
        [ngClass]="{
            'glyphicon-sort': sortColumn!=currentColumn,
            'glyphicon-sort-by-attributes': sortColumn==currentColumn && !isDesc,
            'glyphicon-sort-by-attributes-alt': sortColumn==currentColumn && isDesc
        }" aria-hidden="true" (click)="headerClicked()"></i>
    `,
    styles: ['i {cursor:pointer;}'] 
})
export class SortColHeaderComponent {
    @Input() sortColumn: string= null;
    @Input() currentColumn: string= '';
    isDesc: boolean= true;
    @Output() columnSorted: EventEmitter<any>= new EventEmitter<any>();

    headerClicked() {
        this.sortColumn = this.currentColumn;
        this.isDesc = !this.isDesc;
        this.columnSorted.emit({
            columnName: this.sortColumn,
            isDesc: this.isDesc
        });
    }
}
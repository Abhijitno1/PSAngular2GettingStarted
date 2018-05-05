
import { Component, Input } from '@angular/core';
import { MyAccordianComponent } from './my-accordian.component';

@Component({
    selector: 'my-pane',
    template: `
        <button class="accordion"  [ngClass]="{active: selected===true}"
            (click)="paneContainer.selectPane(this)"><h4>{{title}}</h4></button>
        <div class="pane" [hidden]="!selected">
            <ng-content></ng-content>
        </div>
    `,
    styles: [
        `.accordion {
            background-color: #eee;
            color: #444;
            cursor: pointer;
            padding: 5px;
            width: 100%;
            border: none;
            text-align: left;
            outline: none;
            transition: 0.4s;
        }`,        
        `.active, .accordion:hover {
            background-color: #ccc; 
        }`,
        `.pane {
            padding: 0 18px;
            border: 1px solid #eee;
            overflow: hidden;
        }`
    ]
})
export class MyPaneComponent {
    @Input('heading') title: string= "Pane";
    @Input() selected: boolean= false;

    constructor(private paneContainer: MyAccordianComponent) {
        this.paneContainer.addPane(this);
    }
}
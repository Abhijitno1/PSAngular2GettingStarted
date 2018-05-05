import { Component, Input } from '@angular/core';
import { MyTabsComponent } from './my-tabs.component';

@Component({
    selector: 'my-tab',
    template: `
        <div [hidden]="!selected">
            <ng-content></ng-content>
        </div>
    `
})
export class MyTabComponent {
    @Input() tabTitle: string= "Tab";
    @Input() selected: boolean= false;

    constructor(private tabContainer: MyTabsComponent) {
        this.tabContainer.addTab(this);
    }
}
import { Component, Input } from '@angular/core';
import { MyTabComponent } from './my-tab.component';
//https://blog.thoughtram.io/angular/2015/04/09/developing-a-tabs-component-in-angular-2.html
//https://juristr.com/blog/2016/02/learning-ng2-creating-tab-component/

@Component({
    selector: 'my-tabs',
    template: `
        <ul class="nav nav-tabs">
            <li *ngFor="let tab of tabs" [ngClass]="{active: tab?.selected}">
                <a href="javascript:void(0)" (click)="selectTab(tab)">{{tab?.tabTitle}}</a>
            </li>
        </ul>
        <ng-content></ng-content>
    `
})
export class MyTabsComponent {
    tabs: MyTabComponent[] = [];

    public addTab(tab: MyTabComponent): void {
        if (this.tabs.length==0) {
            tab.selected= true;
        }
        this.tabs.push(tab);
    }

    selectTab(tab: MyTabComponent) {
        this.tabs.forEach(aTab => {
            if (aTab === tab)
                aTab.selected = true;
            else
                aTab.selected = false;
        });
    }
}
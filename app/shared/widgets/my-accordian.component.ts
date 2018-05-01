import { Component, Input } from '@angular/core';
import { MyPaneComponent } from './my-pane.component';

@Component({
    selector: 'my-accordian',
    template: `<ng-content></ng-content>`
})
export class MyAccordianComponent {
    panes: MyPaneComponent[] = [];

    public addPane(pane: MyPaneComponent): void {
        if (this.panes.length==0) {
            pane.selected= true;
        }
        else {
            if (pane.selected===true)
                this.panes[0].selected= false;
        }
        //console.log(tab.tabTitle, tab.selected);
        this.panes.push(pane);
    }

    selectPane(pane: MyPaneComponent) {
        this.panes.forEach(aTab => {
            if (aTab === pane)
                aTab.selected = true;
            else
                aTab.selected = false;
        });
    }
}
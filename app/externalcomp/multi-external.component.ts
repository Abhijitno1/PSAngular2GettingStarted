import { Component, Input } from '@angular/core';
//This is a container view to hold multiple external study components

@Component({
    selector: 'multi-extern',
    template: `
        <my-tabs>
            <my-tab tabTitle="Own Components" selected="true">
                <h3>My own developed components</h3>
                <html-combo></html-combo>
            </my-tab>
            <my-tab tabTitle="Directives">
                <misc-study></misc-study>
            </my-tab>
        </my-tabs>
    `
})
export class MultiExternComponent {

}
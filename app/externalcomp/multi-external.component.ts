import { Component, Input } from '@angular/core';
//This is a container view to hold multiple external study components

@Component({
    selector: 'multi-extern',
    template: `
        <my-tabs>
            <my-tab tabTitle="Directives">
                <misc-study></misc-study>
            </my-tab>
            <my-tab tabTitle="Bar">
                Content of tab Bar
            </my-tab>
        </my-tabs>
    `
})
export class MultiExternComponent {

}
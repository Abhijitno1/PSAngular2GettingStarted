import { Component } from '@angular/core';

@Component({   
    template: `
        <h2>This is container view for Miscelleneous External Study Components</h2>
        <p>Select a Year <select><option *range="[2010, 2020]; let num" [value]="num">{{num}}</option></select></p>
        <p><span [appHighlight]="highlightColor">This text should be highlighted on hover</span></p>
    `
})
export class MiscStudyComponent {
    highlightColor: string= 'Orange';

}
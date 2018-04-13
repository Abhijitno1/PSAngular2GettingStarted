import { Component, OnInit } from '@angular/core';
import { AdItem } from '../shared/models/ad-item';
import { AdService } from './ad.service'

@Component({   
    template: `
        <h2>This is container view for Miscelleneous External Study Components</h2>
        <p>Select a Year <select><option *range="[2010, 2020]; let num" [value]="num">{{num}}</option></select></p>
        <p><span [appHighlight]="highlightColor">This text should be highlighted on hover</span></p>
        <p><ad-banner [ads]="ads"></ad-banner></p>
    `
})
export class MiscStudyComponent implements OnInit {
    highlightColor: string= 'Orange';
    ads: AdItem[]= [];

    constructor(private _adService: AdService) {}

    ngOnInit() {
        this.ads= this._adService.getAdItems();
    }
}
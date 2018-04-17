import { Component, Input, ViewChild, ComponentFactoryResolver, OnDestroy, AfterContentInit, ViewContainerRef } from '@angular/core';
import { AdItem } from '../shared/models/ad-item';

@Component({
    selector: 'ad-banner',
    template: `
        <div class="ad-banner">
            <h3>Advertisements</h3>
            <button style="float:right;" (click)="toggleAdRotation()">{{toggleText}} Ad-rotation</button>
            <ng-template #adContainer></ng-template>
        </div>
    `
})
export class AdBannerComponent implements OnDestroy, AfterContentInit {
    @Input() ads: AdItem[]= [];
    @ViewChild('adContainer', {read: ViewContainerRef}) adHost: ViewContainerRef;
    toggleText: string= "Start";
    _curAdIndex: number= -1;
    _interval: any;

    constructor(private _componentFactoryResolver: ComponentFactoryResolver) {}

    ngAfterContentInit() {
        this.loadComponent();
        //Below line commented to Prevent tab rotation on load in order to debug other components in misc study components view
        //this.setAdIntervals();
    }

    ngOnDestroy() {
        clearInterval(this._interval);
    }

    toggleAdRotation() {
        if (this.toggleText=='Stop') {
            clearInterval(this._interval);
            this.toggleText= 'Start';
        }
        else {
            this.setAdIntervals();
            this.toggleText= 'Stop';
        }
    }

    private loadComponent(): void { 
        if (this.ads.length == 0) return;       
        this._curAdIndex = (this._curAdIndex+1) % this.ads.length;
        let nextAd= this.ads[this._curAdIndex];
        this.adHost.clear();
        let adFactory= this._componentFactoryResolver.resolveComponentFactory(nextAd.component);        
        let newComponentRef= this.adHost.createComponent(adFactory);
        //console.log('i was here', newComponentRef);        
        (<AdItem>newComponentRef.instance).data = nextAd.data;
    }

    private setAdIntervals() {
        this._interval= setInterval(()=>{
            this.loadComponent();
        }, 3000);
    }
}
import { Component, Input, ViewChild, ComponentFactoryResolver, OnInit, OnDestroy } from '@angular/core';
import { AdItem } from '../shared/models/ad-item';
import { AdHostDirective } from './ad-host.directive';


@Component({
    selector: 'ad-banner',
    template: `
        <div class="ad-banner">
            <h3>Advertisements</h3>
            <ng-template ad-host></ng-template>
        </div>
    `
})
export class AdBannerComponent implements OnInit, OnDestroy {
    @Input() ads: AdItem[]= [];
    @ViewChild(AdHostDirective) adHost: AdHostDirective;
    _curAdIndex: number= -1;
    _interval: any;

    constructor(private _componentFactoryResolver: ComponentFactoryResolver) {}

    ngOnInit() {
        this.loadComponent();
        this.setAdIntervals();
    }

    ngOnDestroy() {
        clearInterval(this._interval);
    }

    private loadComponent(): void { 
        if (this.ads.length == 0) return;       
        this._curAdIndex = (this._curAdIndex+1) % this.ads.length;
        let nextAd= this.ads[this._curAdIndex];
        let viewContainerRef= this.adHost.viewContainerRef;
        viewContainerRef.clear();
        let adFactory= this._componentFactoryResolver.resolveComponentFactory(nextAd.component);        
        let newComponentRef= viewContainerRef.createComponent(adFactory);
        //console.log('i was here', newComponentRef);        
        (<AdItem>newComponentRef.instance).data = nextAd.data;
    }

    private setAdIntervals() {
        this._interval= setInterval(()=>{
            this.loadComponent();
        }, 3000);
    }
}
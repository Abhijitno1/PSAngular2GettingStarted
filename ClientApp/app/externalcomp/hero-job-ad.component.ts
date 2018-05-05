import { Component, Input } from '@angular/core';
import { IAdComponent } from './ad.component';

@Component({
    template: `
        <div class="job-ad">
            <h4>{{data.headline}}</h4>

            {{data.body}}
        </div>
    `
})
export class HeroJobAdComponent implements IAdComponent {
    @Input() data: any;
}
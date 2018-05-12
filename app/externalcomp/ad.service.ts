import {Injectable} from '@angular/core';
import {AdItem} from '../shared/models/ad-item';
import {HeroJobAdComponent} from './hero-job-ad.component';
import {HeroProfileComponent} from './hero-profile.component';

@Injectable()
export class AdService {
    public getAdItems(): AdItem[] {
        return [
            new AdItem(HeroJobAdComponent, {
                headline: 'Hiring for several positions',
                body: 'Submit your resume today!'
            }),
            new AdItem(HeroJobAdComponent, {
                headline: 'Openings in all departments',
                body: 'Apply today'
            }),
            new AdItem(HeroProfileComponent, {name: 'Bombasto', bio: 'Brave as they come'}),
            new AdItem(HeroProfileComponent, {name: 'Dr IQ', bio: 'Smart as they come'})
        ];
    }
}
import { NgModule, CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiscStudyComponent } from './misc-study.component'
import { RangeDirective } from './range.directive';
import { HighlightDirective } from './highlight.directive';
import { AdBannerComponent } from './ad-banner.component'
import { HeroJobAdComponent } from './hero-job-ad.component';
import { HeroProfileComponent } from './hero-profile.component';
import { AdService } from './ad.service';
import { TreeViewComponent } from './tree-view.component';
import { TreeDataService } from './tree-data.service';
import { MultiExternComponent } from './multi-external.component';
import { MyTabsComponent } from './my-tabs.component';
import { MyTabComponent } from './my-tab.component';
import { HtmlDisplayComboComponent } from '../mywidgets/html-display-combo.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        MiscStudyComponent,
        RangeDirective,
        HighlightDirective,
        AdBannerComponent,
        HeroJobAdComponent,
        HeroProfileComponent,
        TreeViewComponent,
        MultiExternComponent,
        MyTabsComponent,
        MyTabComponent,
        HtmlDisplayComboComponent
    ],
    entryComponents: [
        HeroJobAdComponent,
        HeroProfileComponent
    ],
    providers: [
        AdService,
        TreeDataService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class MiscStudyModule {}
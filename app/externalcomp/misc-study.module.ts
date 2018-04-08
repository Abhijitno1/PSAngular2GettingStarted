import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiscStudyComponent } from './misc-study.component'
import { RangeDirective } from './range.directive';
import { HighlightDirective } from './highlight.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        MiscStudyComponent,
        RangeDirective,
        HighlightDirective
    ]
})
export class MiscStudyModule {}
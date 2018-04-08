import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiscStudyComponent } from './misc-study.component'
import { RangeDirective } from './range.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        MiscStudyComponent,
        RangeDirective
    ]
})
export class MiscStudyModule {}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; //ToDo: Check if required and remove
import { FormsModule } from '@angular/forms';
import { StarRatingComponent } from './star-rating.component';

@NgModule({
    /*imports: [
        CommonModule, //A module can export another module without actually using it
        FormsModule
    ],*/
    declarations: [
        StarRatingComponent
    ],
    exports: [
        StarRatingComponent,
        CommonModule,
        FormsModule
    ]
})
export class WidgetsModule {}
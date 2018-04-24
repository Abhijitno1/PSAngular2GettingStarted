import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; //ToDo: Check if required and remove
import { FormsModule } from '@angular/forms';
import { StarRatingComponent } from './star-rating.component';
import { OrderByPipe } from './order-by.pipe';
import { SortColHeaderComponent } from './sort-col-header.component';
import { HtmlDisplayComboComponent } from './html-display-combo.component';
import { MultiCheckComboComponent } from './multi-check-combo.component';

@NgModule({
    imports: [
        CommonModule
        //, FormsModule  //A module can export another module without actually using it
    ],
    declarations: [
        StarRatingComponent,
        SortColHeaderComponent,
        HtmlDisplayComboComponent,
        MultiCheckComboComponent,
        OrderByPipe
    ],
    exports: [
        StarRatingComponent,
        SortColHeaderComponent,
        HtmlDisplayComboComponent,
        MultiCheckComboComponent,
        OrderByPipe,
        CommonModule,
        FormsModule
    ]
})
export class WidgetsModule {}
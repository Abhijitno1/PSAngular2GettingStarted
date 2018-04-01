import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';
import { StarRatingComponent } from './shared/widgets/star-rating.component';
import { ProductsService } from './products/products.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [ 
    AppComponent,
    ProductListComponent,
    ConvertToSpacesPipe,
    StarRatingComponent
  ],
  providers: [
    ProductsService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { ProductListComponent } from './products/product-list.component';
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';
import { StarRatingComponent } from './shared/widgets/star-rating.component';
import { ProductsService } from './products/products.service';
import { ProductDetailComponent } from './products/product-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'welcome', component: WelcomeComponent},
      {path: 'products', component: ProductListComponent},
      {path: 'products/:id', component: ProductDetailComponent},
      {path: '', redirectTo: 'welcome', pathMatch: 'full' }, //No path specified
      {path: '**', redirectTo: 'welcome', pathMatch: 'full' } //Nonexisting path specified
    ]),
    HttpModule
  ],
  declarations: [ 
    AppComponent,
    WelcomeComponent,
    ProductListComponent,
    ConvertToSpacesPipe,
    StarRatingComponent,
    ProductDetailComponent
  ],
  providers: [
    ProductsService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ProductsModule } from './products/products.module';
import { MiscStudyModule } from './externalcomp/misc-study.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { MiscStudyComponent } from './externalcomp/misc-study.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'welcome', component: WelcomeComponent},
      {path: 'miscstudy', component: MiscStudyComponent},
      {path: '', redirectTo: 'welcome', pathMatch: 'full' }, //No path specified
      {path: '**', redirectTo: 'welcome', pathMatch: 'full' } //Nonexisting path specified
    ]),
    HttpModule,
    ProductsModule,
    MiscStudyModule
  ],
  declarations: [ 
    AppComponent,
    WelcomeComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
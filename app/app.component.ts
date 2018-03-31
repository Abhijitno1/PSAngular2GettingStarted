import { Component } from '@angular/core';
import { ProductListComponent } from './products/product-list.component';

@Component({
  selector: 'pm-app',
  templateUrl: './app/app.component.html'
  //styleUrls: ['./app/app.component.css']
})
export class AppComponent {
  appTitle: string = 'Product Management Angular2 App'; 
}
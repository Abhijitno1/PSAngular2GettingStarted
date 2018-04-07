import { Injectable } from "@angular/core";
import { IProduct } from "../shared/models/product";
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
//import Products from '../shared/data/products'; //ToDo: remove this line

@Injectable()
export class ProductsService {
    private _dataUrl: string = './app/shared/data/products.json';

    constructor(private _http: Http) {};

    getProducts(): Observable<IProduct[]> {
        return this._http.get(this._dataUrl)
        .map((resp: Response) => { 
            let jsonData = resp.json();
            jsonData.forEach(elm => {
                elm.releaseDate = new Date(elm.releaseDate);
            });
            return jsonData;
         })
        .do(data => console.log(JSON.stringify(data)))
        .catch(this.handleError);
    }

    getProduct(productId: number): Observable<IProduct> {
        let foundProduct= this.getProducts().map((products: IProduct[]) => 
            products.find(prod => prod.productId == productId));
        return foundProduct;
    }

    handleError(err: Response | any, caught: Observable<any>) {
        console.log(err.message || err);
        return Observable.throw(err.message || err);
    }
}
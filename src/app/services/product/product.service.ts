import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ProductService {
  constructor(private client: HttpClient) {

  }

  getProducts() {
    return this.client.get('https://dummyjson.com/products', {
      observe: 'body',
      responseType: 'json'
    })
  }
}

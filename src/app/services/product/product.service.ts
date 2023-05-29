import {HttpClient, HttpParams} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {FetchProductsOptions} from "./@types";

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  constructor(private client: HttpClient) {

  }

  getProducts({skip = 0, limit = 30}: FetchProductsOptions = {}) {
    return this.client.get(`https://dummyjson.com/products`, {
      observe: 'body',
      responseType: 'json',
      params: new HttpParams().set('skip', skip?.toString()).set('limit', limit?.toString())
    })
  }
}

import {HttpClient, HttpParams} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {FetchProductsOptions} from "./@types";

// We use this dummy website for test that returns a list of products
const PRODUCTS_URL = 'https://dummyjson.com/products'

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  constructor(private client: HttpClient) {

  }

  getProducts({skip = 0, limit = 30}: FetchProductsOptions = {}) {
    return this.client.get(PRODUCTS_URL, {
      observe: 'body',
      responseType: 'json',
      params: new HttpParams().set('skip', skip?.toString()).set('limit', limit?.toString())
    })
  }
}

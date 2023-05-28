import {Component, OnInit} from '@angular/core';
import {TGridComponent} from "./components/t-grid/t-grid.component";
import {TColumnComponent} from "./components/t-grid/components/t-column/t-column.component";
import {ProductService} from "./services/product/product.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TGridComponent,
    TColumnComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'robert-app';
  data = [];
  totalData: number = 0;
  limit: number = 0;
  skip: number = 0;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.getProducts().subscribe((data: any) => {
      this.data = data.products
    })
  }

  paginationChange(data: any) {
    console.log(data);
  }
}

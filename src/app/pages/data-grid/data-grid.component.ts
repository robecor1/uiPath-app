import {Component, OnInit} from '@angular/core';
import {TGridComponent} from "../../components/t-grid/t-grid.component";
import {TColumnComponent} from "../../components/t-grid/components/t-column/t-column.component";
import {ProductService} from "../../services/product/product.service";

@Component({
  selector: 'app-data-grid',
  standalone: true,
  imports: [
    TGridComponent,
    TColumnComponent
  ],
  templateUrl: './data-grid.component.html',
})
export class DataGridComponent implements OnInit {
  title = 'Data Grid';
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

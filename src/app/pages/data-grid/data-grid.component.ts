import {Component, OnInit} from '@angular/core';
import {TGridComponent} from "../../components/t-grid/t-grid.component";
import {TColumnComponent} from "../../components/t-grid/components/t-column/t-column.component";
import {ProductService} from "../../services/product/product.service";
import {map} from 'rxjs'

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
  data: any = [];
  totalData: number = 0;
  limit: number = 0;
  skip: number = 0;
  pageSize: number = 30;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.loadData()
  }

  paginationChange({currentPage, pageSize}: { currentPage: number, pageSize: number | null }): void {
    this.skip = (currentPage - 1) * (pageSize || 0)
    this.loadData()
  }

  sortChange(data: any): void {
    console.log(data)
  }

  loadData() {
    this.productService.getProducts({
      skip: this.skip,
      limit: this.pageSize
    }).subscribe((data: any) => {
      this.data = data.products
    })
  }

  loadDataObservable() {
    this.data = this.productService.getProducts().pipe(map((data: any) => data.products))
  }
}

import {Component, OnInit} from '@angular/core';
import {TGridComponent} from "./components/t-grid/t-grid.component";
import {TColumnComponent} from "./components/t-grid/components/t-column/t-column.component";

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
  data = []

  ngOnInit() {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(json => {
        this.data = json.products
      })
  }

  paginationChange(data: any) {
    console.log(data);
  }
}

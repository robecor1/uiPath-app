import { Route } from '@angular/router';
import {DataGridComponent} from "../pages/data-grid/data-grid.component";

export const routes: Route[] = [
  {
    path: 'grid',
    component: DataGridComponent,
  },
];

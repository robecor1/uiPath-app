import { Route } from '@angular/router';
import {DataGridComponent} from "../pages/data-grid/data-grid.component";
import {ProgressCircleComponent} from "../pages/progress-circle/progress-circle.component";

export const routes: Route[] = [
  {
    path: 'grid',
    component: DataGridComponent,
  },
  {
    path: 'progress',
    component: ProgressCircleComponent,
  },
];

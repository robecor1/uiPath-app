import {Component} from '@angular/core';
import {TProgressComponent} from "../../components/t-progress/t-progress.component";

@Component({
  selector: 'app-progress-circle',
  standalone: true,
  imports: [
    TProgressComponent
  ],
  templateUrl: './progress-circle.component.html',
})
export class ProgressCircleComponent {
}

import {Component, OnInit} from '@angular/core';
import {TProgressComponent} from "../../components/t-progress/t-progress.component";

@Component({
  selector: 'app-progress-circle',
  standalone: true,
  imports: [
    TProgressComponent
  ],
  templateUrl: './progress-circle.component.html',
  styles: [`
    .progress-circle-container {
      padding: 100px;
      display: flex;
      justify-content: center;
    }
  `]
})
export class ProgressCircleComponent implements OnInit {
  progress: number = 0
  intervalId: number

  ngOnInit() {
    this.intervalId = setInterval(() => {
      if (this.progress >= 100) {
        this.progress = 0
      } else {
        this.progress += 10
      }
    }, 1000)
  }

  ngOnDestroy() {
    clearInterval(this.intervalId)
  }
}

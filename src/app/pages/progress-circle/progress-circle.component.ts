import {Component, OnInit} from '@angular/core';
import {TProgressComponent} from "../../components/t-progress/t-progress.component";
import { ActivatedRoute } from '@angular/router';
import {Subscription} from "rxjs";
import {LoaderType} from "../../components/t-progress/@type";

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
  querySubscription: Subscription
  loadType: LoaderType

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.querySubscription = this.route.queryParams.subscribe((params) => {
      this.loadType = params['type']
    })

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

    if (this.querySubscription) {
      this.querySubscription.unsubscribe()
    }
  }
}

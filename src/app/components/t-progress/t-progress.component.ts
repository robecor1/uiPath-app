import {Component, Input, SimpleChange, SimpleChanges} from '@angular/core';
import {LoaderType} from "./@type";
import {CommonModule} from "@angular/common";

const DEFAULT_RADIUS = 100
const DEFAULT_COLOR = '#51e2f5'
const MAX_DEGREE = 180
const MAX_RIGHT_PROGRESS = 50
const DEFAULT_TYPE = 'clock'

@Component({
  selector: 't-progress',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './t-progress.component.html',
  styleUrls: ['./t-progress.component.scss'],
})
export class TProgressComponent {
  @Input() radius: number = DEFAULT_RADIUS
  @Input() progress: number = 0
  @Input() color: string = DEFAULT_COLOR
  // This input is not in the requirements
  // I added it because I did not know what kind of animation fill you wanted so I added 2 of them
  // The 2 values are fill and clock and the default one is clock
  @Input() type: LoaderType = DEFAULT_TYPE

  ngOnChanges(changes: SimpleChanges) {
    // If the type input doesn't match the accepted type, change to the default one
    // OPTIONAL: Add an error logger here
    if (changes['type'] && !['fill', 'clock'].includes(changes['type'].currentValue)) {
      this.type = DEFAULT_TYPE
    }
  }

  // Returns the degree for the right side of the clock loader (0% -> 50% loaded)
  getRightDegree() {
    // If we are past 50% progress keep the right side filled
    if (this.progress >= MAX_RIGHT_PROGRESS) {
      return MAX_DEGREE
    }

    return this.progress * MAX_DEGREE / MAX_RIGHT_PROGRESS
  }

  // Returns the degree for the left side of the clock loader (51% -> 100% loaded)
  getLeftDegree() {
    // If we are below 50% progress keep the left side hidden
    if (this.progress <= MAX_RIGHT_PROGRESS) {
      return 0
    }

    return (this.progress - MAX_RIGHT_PROGRESS) * MAX_DEGREE / MAX_RIGHT_PROGRESS
  }
}

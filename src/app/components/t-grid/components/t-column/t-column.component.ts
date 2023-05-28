import {Component, Input} from '@angular/core'
import {CommonModule} from '@angular/common'

@Component({
  selector: 't-column',
  templateUrl: './t-column.component.html',
  styleUrls: ['./t-column.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
  ]
})

export class TColumnComponent<T> {
  @Input() name: string;
  @Input() property: keyof T;
  @Input() sortable: boolean;

  data: T[];
  globalSortable: boolean = false;
}

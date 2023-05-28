import {Component, Input} from '@angular/core'
import {CommonModule} from '@angular/common'
import {Direction} from "../../@types";
import {SortedChangeFunction} from "./@types";

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
  @Input() sortable: boolean = false;

  data: T[];
  globalSortable: boolean = false;
  sorted: Direction | null = null

  upCaret: string = '&#9650'
  downCaret: string = '&#9660'

  sortedChange: SortedChangeFunction = null

  clickSort(): void {
    switch (this.sorted) {
      case null:
        this.sorted = 'asc'
        break
      case 'asc':
        this.sorted = 'desc'
        break
      case 'desc':
        this.sorted = null
        break
    }

    if (this.sortedChange) {
      this.sortedChange({columnName: this.property as string, direction: this.sorted})
    }
  }

  isSortable() {
    return this.sortable && this.globalSortable
  }
}

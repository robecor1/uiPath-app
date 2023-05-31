import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core'
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TColumnComponent<T> {
  @Input() name: string;
  @Input() property: keyof T;
  @Input() sortable: boolean = false;

  data: T[];
  globalSortable: boolean = false;
  sorted: Direction = null

  upCaret: string = '&#9650'
  downCaret: string = '&#9660'

  sortedChange: SortedChangeFunction = null
  cdr: ChangeDetectorRef

  constructor(cdr: ChangeDetectorRef) {
    this.cdr = cdr
  }


  clickSort(): void {
    let newSorted = this.sorted

    switch (this.sorted) {
      case null:
        newSorted = 'asc'
        break
      case 'asc':
        newSorted = 'des'
        break
      case 'des':
        newSorted = null
        break
    }

    if (this.sortedChange) {
      this.sortedChange({columnName: this.property as string, direction: newSorted})
    }
  }

  isSortable() {
    return this.sortable && this.globalSortable
  }
}

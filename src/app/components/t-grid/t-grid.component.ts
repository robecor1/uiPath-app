import {Component, ContentChildren, Input, QueryList, Output, EventEmitter} from '@angular/core'
import {CommonModule} from '@angular/common'
import {Observable, isObservable} from "rxjs";
import {TColumnComponent} from "./components/t-column/t-column.component";
import {TPaginationComponent} from "./components/t-pagination/t-pagination.component";
import {DataPerKey, Direction, TGridDataItem} from "./@types";

@Component({
  selector: 't-grid',
  templateUrl: './t-grid.component.html',
  styleUrls: ['./t-grid.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TColumnComponent,
    TPaginationComponent
  ]
})

export class TGridComponent {
  @Input() data: TGridDataItem[] | Observable<TGridDataItem[]> = [];
  @Input() sortable: boolean = true;
  @Input() pageSize: number | null = null;

  @Output() sortChange = new EventEmitter<{columnName: string, direction: Direction}>()
  @Output() paginationChange = new EventEmitter<{currentPage: number, pageSize: number | null}>()

  @ContentChildren(TColumnComponent) children: QueryList<TColumnComponent<TGridDataItem>>

  dataPerKey: DataPerKey<TGridDataItem> = {};
  currentPage: number = 1

  ngAfterContentInit() {
    this.addDataToColumns()
  }

  ngOnChanges() {
    this.addDataToColumns()
  }

  initDataKey(): void {
    this.dataPerKey = {}
    // Initialize the data object based on the children and their property input
    for (const child of this.children) {
      Object.assign(this.dataPerKey, {
        [child.property]: []
      })
    }
  }

  onNextPres() {
    this.paginationChange.emit({currentPage: ++this.currentPage, pageSize: this.pageSize})
  }

  onPrevPres() {
    this.paginationChange.emit({currentPage: --this.currentPage, pageSize: this.pageSize})
  }

  addDataToColumns(): void {
    if (this.children && this.data) {
      this.initDataKey()
      this.prepareToPopulateDataKey()
      this.injectDataInChildren()
    }
  }

  prepareToPopulateDataKey(): void {
    //Check if the data received is an observable and subscribe to it, processing the data as it comes
    if (isObservable(this.data)) {
      this.data.subscribe((data: TGridDataItem[]) => {
        this.populateDataKey(data)
      })
    } else {
      // If it's not proceed as usual
      this.populateDataKey(this.data)
    }
  }

  injectDataInChildren(): void {
    for (const child of this.children) {
      const childProperty = child.property as keyof DataPerKey<TGridDataItem>

      //Make sure the t-column property input exists in our object as a key
      if (Object.keys(this.dataPerKey).includes(childProperty)) {
        // Assign the data input the value of the array at that key
        child.data = this.dataPerKey[childProperty] || []
      }

      child.globalSortable = this.sortable
      child.sortedChange = this.sortedChangeHandle.bind(this)
    }
  }

  populateDataKey(data: TGridDataItem[]) {
    // We should iterate over the data input once and build the "dataPerKey" object
    // We do this as to not iterate it with a map for each child and pass the data
    for (const item of data as TGridDataItem[]) {
      // Iterate over the keys. These should be matched with the "property" input from the t-column template
      for (const key of Object.keys(this.dataPerKey)) {
        Object.assign(this.dataPerKey, {
          // Add the value of the field to the array for that key ar create a new one with one item
          [key]: [...this.dataPerKey[key as keyof DataPerKey<TGridDataItem>], item[key] ?? null]
        })
      }
    }
  }

  sortedChangeHandle({columnName, direction}: {columnName: string, direction: Direction}): void {
    this.sortChange.emit({columnName, direction: direction})
  }
}

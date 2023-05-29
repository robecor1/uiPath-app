import {Component, ContentChildren, Input, QueryList, Output, EventEmitter, SimpleChange} from '@angular/core'
import {CommonModule} from '@angular/common'
import {Observable, isObservable, Subscription} from "rxjs";
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
    TPaginationComponent
  ]
})

export class TGridComponent {
  @Input() data: TGridDataItem[] | Observable<TGridDataItem[]> = [];
  @Input() sortable: boolean = true;
  @Input() pageSize: number | null = null;

  @Output() sortChange = new EventEmitter<{ columnName: string, direction: Direction }>()
  @Output() paginationChange = new EventEmitter<{ currentPage: number, pageSize: number | null }>()

  @ContentChildren(TColumnComponent) children: QueryList<TColumnComponent<TGridDataItem>>

  private dataPerKey: DataPerKey<TGridDataItem> = {};
  private dataSubscription: Subscription
  private sortKey: string
  private sortDirection: Direction = null

  ngAfterContentInit() {
    this.addDataToColumns()
  }

  ngOnChanges({data}: {data?: SimpleChange }) {
    if (data) {
      if (data.previousValue !== data.currentValue) {
        this.addDataToColumns()
      }
    }
  }

  ngOnDestroy() {
    this.dataSubscription && this.dataSubscription.unsubscribe()
  }

  addDataToColumns(): void {
    if (this.children && this.data) {
      this.initDataKey()
    }
  }

  initDataKey(): void {
    this.dataPerKey = {}
    // Initialize the data object based on the children and their property input
    // We do this by iterating the children, getting the property field and adding a field with that name and an empty string as a value
    for (const child of this.children) {
      Object.assign(this.dataPerKey, {
        [child.property]: []
      })
    }

    this.prepareToPopulateDataKey()
  }

  prepareToPopulateDataKey(): void {
    //Check if the data received is an observable and subscribe to it, processing the data as it comes
    if (isObservable(this.data)) {
      this.dataSubscription = this.data.subscribe((data: TGridDataItem[]) => {
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

      if (this.sortKey === childProperty) {
        child.sorted = this.sortDirection
      } else {
        child.sorted = null
      }
    }
  }

  populateDataKey(data: TGridDataItem[]) {
    const newKeyData = {...this.dataPerKey}
    this.sortData(data)

    // We should iterate over the data input once and build the "dataPerKey" object
    // We do this as to not iterate it with a map for each child and pass the data
    for (const item of data as TGridDataItem[]) {
      // Iterate over the keys. These should be matched with the "property" input from the t-column template
      for (const key of Object.keys(newKeyData)) {
        Object.assign(newKeyData, {
          // Add the value of the field to the array for that key ar create a new one with one item
          [key]: [...newKeyData[key as keyof DataPerKey<TGridDataItem>], item[key] ?? null]
        })
      }
    }

    this.dataPerKey = newKeyData

    this.injectDataInChildren()
  }

  sortData(data: TGridDataItem[]) {
    if (this.sortDirection !== null) {
      data.sort((prev, next) => {
        const prevValue = prev[this.sortKey] || ''
        const nextValue = next[this.sortKey] || ''

        if (typeof prevValue === 'number' && typeof nextValue === 'number') {
          return this.sortDirection === 'asc' ? prevValue - nextValue : nextValue - prevValue
        }
        if (typeof prevValue === 'string' && typeof nextValue === 'string') {
          return this.sortDirection === 'asc' ? prevValue.localeCompare(nextValue) : nextValue.localeCompare(prevValue)
        }
        if (prevValue instanceof Date && nextValue instanceof Date) {
          return this.sortDirection === 'asc' ? prevValue.getTime() - nextValue.getTime() : nextValue.getTime() - prevValue.getTime()
        }

        return this.sortDirection === 'asc' ? prevValue.toString().localeCompare(nextValue.toString()) : nextValue.toString().localeCompare(prevValue.toString())
      })
    }
  }

  sortedChangeHandle({columnName, direction}: { columnName: string, direction: Direction }): void {
    this.sortKey = columnName
    this.sortDirection = direction
    this.addDataToColumns()

    this.sortChange.emit({columnName, direction: direction})
  }
}

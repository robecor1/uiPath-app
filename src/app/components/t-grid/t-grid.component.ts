import {Component, ContentChildren, Input, QueryList, SimpleChange} from '@angular/core'
import {CommonModule} from '@angular/common'
import {Observable} from "rxjs";
import {TColumnComponent} from "./components/t-column/t-column.component";
import {DataPerKey, TGridDataItem} from "./@types";

@Component({
  selector: 't-grid',
  templateUrl: './t-grid.component.html',
  styleUrls: ['./t-grid.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TColumnComponent
  ]
})

export class TGridComponent {
  @Input() data: TGridDataItem[] | Observable<TGridDataItem[]> = [];
  @Input() sortable: boolean = true;
  @Input() pageSize: number | null = null;

  @ContentChildren(TColumnComponent) children: QueryList<TColumnComponent<TGridDataItem>>

  dataPerKey: DataPerKey<TGridDataItem> = {};

  ngAfterContentInit() {
    this.addDataToColumns()
  }

  ngOnChanges(changes: SimpleChange) {
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

  addDataToColumns(): void {
    if (this.children && this.data) {
      this.initDataKey()
      this.populateDataKey()
      this.injectDataInChildren()
    }
  }

  populateDataKey(): void {
    // We should iterate over the data input once and build the "dataPerKey" object
    // We do this as to not iterate it with a map for each child and pass the data
    for (const item of this.data as TGridDataItem[]) {
      // Iterate over the keys. These should be matched with the "property" input from the t-column template
      for (const key of Object.keys(this.dataPerKey)) {
        Object.assign(this.dataPerKey, {
          // Add the value of the field to the array for that key ar create a new one with one item
          [key]: [...this.dataPerKey[key as keyof DataPerKey<TGridDataItem>], item[key] ?? null]
        })
      }
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
    }
  }
}

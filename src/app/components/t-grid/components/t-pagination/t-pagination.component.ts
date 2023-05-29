import {Component, Output, EventEmitter, Input, OnInit} from '@angular/core'
import {debounceTime, Subject} from "rxjs";

@Component({
  selector: 't-pagination',
  templateUrl: './t-pagination.component.html',
  styleUrls: ['./t-pagination.component.scss'],
  standalone: true,
  imports: []
})

export class TPaginationComponent implements OnInit {
  @Input() pageSize: number | null = null;

  @Output() paginationChange = new EventEmitter<{ currentPage: number, pageSize: number | null }>()

  currentPage: number = 1
  // Add a debouncer for the page change clicks
  private clickDebouncerSubject: Subject<void> = new Subject()

  ngOnInit() {
    // Set a debounce time in the pipe of the observable and then subscribe to it
    // This will be called each time we emit an event
    this.clickDebouncerSubject
      .pipe(
        debounceTime(300)
      )
      .subscribe(() => {
        this.paginationChange.emit({currentPage: this.currentPage, pageSize: this.pageSize})
      })
  }

  ngOnDestroy() {
    this.clickDebouncerSubject.unsubscribe()
  }

  pageChange(change: -1 | 1) {
    this.currentPage += change
    //Emit an event on the observable
    this.clickDebouncerSubject.next()
  }
}

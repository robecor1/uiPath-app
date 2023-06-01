import {Component, Output, EventEmitter, Input} from '@angular/core'

@Component({
  selector: 't-pagination',
  templateUrl: './t-pagination.component.html',
  styleUrls: ['./t-pagination.component.scss'],
  standalone: true,
  imports: []
})

export class TPaginationComponent {
  @Input() pageSize: number | null = null;
  @Input() lastPage: number;

  @Output() paginationChange = new EventEmitter<{ currentPage: number, pageSize: number | null }>()

  currentPage: number = 1

  pageChange(change: -1 | 1) {
    this.currentPage += change
    //Emit an event on the output
    this.paginationChange.emit({currentPage: this.currentPage, pageSize: this.pageSize})
  }
}

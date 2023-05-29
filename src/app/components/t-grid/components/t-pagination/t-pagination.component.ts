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

  @Output() paginationChange = new EventEmitter<{currentPage: number, pageSize: number | null}>()

  currentPage: number = 1

  onNextPres() {
    this.paginationChange.emit({currentPage: ++this.currentPage, pageSize: this.pageSize})
  }

  onPrevPres() {
    this.paginationChange.emit({currentPage: --this.currentPage, pageSize: this.pageSize})
  }
}

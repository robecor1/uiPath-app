import {TestBed} from '@angular/core/testing';
import {TGridComponent} from './t-grid.component';
import {TColumnComponent} from "./components/t-column/t-column.component";
import {TGridDataItem} from "./@types";
import {Component, SimpleChange, ViewChild} from "@angular/core";
import {By} from "@angular/platform-browser";

// Create a test component wrapper that uses both t-grid and t-column inside t-grid
// This way t-grid can be tested if it renders columns based on the provided data
@Component({
  selector: 'test-grid-component',
  standalone: true,
  imports: [
    TGridComponent,
    TColumnComponent,
  ],
  template: `
    <t-grid>
      <t-column></t-column>
    </t-grid>`,
})
class TestGridWrapper {
  @ViewChild(TGridComponent) tGridComponent: TGridComponent;
  @ViewChild(TColumnComponent) tColumnComponent: TColumnComponent<TGridDataItem>;
}

describe('TGrid', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      TestGridWrapper,
      TGridComponent,
      TColumnComponent
    ]
  }).compileComponents());

  it('should create the grid', () => {
    const fixture = TestBed.createComponent(TGridComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have column rendered correctly', () => {
    const wrapperFixture = TestBed.createComponent(TestGridWrapper)
    const wrapperComponent = wrapperFixture.componentInstance
    const wrapperElement = wrapperFixture.nativeElement as HTMLElement

    wrapperFixture.detectChanges()

    const TEST_DATA = [{
      field: 'value'
    }]

    // Add data to t-grid
    wrapperComponent.tGridComponent.data = TEST_DATA
    // Add property to t-column
    wrapperComponent.tColumnComponent.property = Object.keys(TEST_DATA[0])[0]
    // Call the ngOnChanges on the t-grid
    // This is to simulate the data passed as input
    wrapperFixture.componentInstance.tGridComponent.ngOnChanges({data: new SimpleChange(null, TEST_DATA, false)})

    //Check to see it the column item was rendered with correct value
    expect(wrapperElement.querySelector('.t-grid_item')?.textContent).toBe(TEST_DATA[0].field);

  });

  it('should have correct pagination', () => {
    const fixture = TestBed.createComponent(TGridComponent);
    const component = fixture.componentInstance;
    const element = fixture.nativeElement;

    const PAGE_SIZE = 30
    const TOTAL_DATA = 100
    const LAST_PAGE = Math.ceil(TOTAL_DATA / PAGE_SIZE)

    component.pageSize = PAGE_SIZE
    component.totalData = TOTAL_DATA

    fixture.detectChanges()

    // Check to see if the last page is set correctly
    expect(component.getLastPage()).toBe(LAST_PAGE)
    // Check to see if the pagination was rendered correctly
    expect(element.querySelector('.page-info')?.textContent).toContain('Page 1');
  });

  it('should trigger page change', () => {
    const fixture = TestBed.createComponent(TGridComponent);
    const component = fixture.componentInstance;

    const PAGE_SIZE = 30
    const TOTAL_DATA = 100

    component.pageSize = PAGE_SIZE
    component.totalData = TOTAL_DATA

    fixture.detectChanges()

    const pagePrev = fixture.debugElement.query(By.css('.prev-btn'));
    const pageNext = fixture.debugElement.query(By.css('.next-btn'));

    let page: number = 0
    let currentPageSize: number | null = 0

    const sub = component.paginationChange.subscribe(({currentPage, pageSize}) => {
      page = currentPage
      currentPageSize = pageSize
    })

    pageNext.triggerEventHandler('click')
    expect(page).toBe(2)
    expect(currentPageSize).toBe(PAGE_SIZE)
    pagePrev.triggerEventHandler('click')
    expect(page).toBe(1)
    expect(currentPageSize).toBe(PAGE_SIZE)

    sub.unsubscribe()
  });

  it('should trigger sort', () => {
    const wrapperFixture = TestBed.createComponent(TestGridWrapper)
    const wrapperComponent = wrapperFixture.componentInstance
    const wrapperElement = wrapperFixture.nativeElement as HTMLElement

    wrapperFixture.detectChanges()

    const TEST_DATA = [{
      field: 1
    },
      {
        field: 2
      }]

    // Add data to t-grid
    wrapperComponent.tGridComponent.data = TEST_DATA
    // Make sortable
    wrapperComponent.tGridComponent.sortable = true
    // Add property to t-column
    wrapperComponent.tColumnComponent.property = Object.keys(TEST_DATA[0])[0]
    // Make sortable
    wrapperComponent.tColumnComponent.sortable = true
    // Call the ngOnChanges on the t-grid
    // This is to simulate the data passed as input
    wrapperFixture.componentInstance.tGridComponent.ngOnChanges({data: new SimpleChange(null, TEST_DATA, false)})

    let currentColumnName: string = ''
    let currentDirection: string = ''

    const sub = wrapperComponent.tGridComponent.sortChange.subscribe(({columnName, direction}) => {
      currentColumnName = columnName
      currentDirection = direction as string
    })

    const columnHeaderElement = wrapperFixture.debugElement.query(By.css('.t-grid_header'));
    columnHeaderElement.triggerEventHandler('click')
    expect(currentColumnName).toBe(Object.keys(TEST_DATA[0])[0])
    expect(currentDirection).toBe('asc')
    columnHeaderElement.triggerEventHandler('click')
    expect(currentDirection).toBe('des')

    sub.unsubscribe()
  });
});

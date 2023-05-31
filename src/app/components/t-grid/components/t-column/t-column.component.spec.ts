import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TColumnComponent} from './t-column.component';

describe('TColumn', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      TColumnComponent
    ]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(TColumnComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render header', () => {
    const fixture = TestBed.createComponent(TColumnComponent);
    const HEADER_NAME = 'test header'
    fixture.componentInstance.name = HEADER_NAME
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.t-grid_header')?.textContent).toContain(HEADER_NAME);
  });

  it('should render up caret', () => {
    const fixture = TestBed.createComponent(TColumnComponent);
    // Javascript string unicode for up caret
    const UP_CARET_UNICODE = "\u25B2"
    fixture.componentInstance.sorted = 'asc'
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.t-grid_header')?.textContent).toContain(UP_CARET_UNICODE);
  });

  it('should render down caret', () => {
    const fixture = TestBed.createComponent(TColumnComponent);
    // Javascript string unicode for down caret
    const DOWN_CARET_UNICODE = "\u25BC"
    fixture.componentInstance.sorted = 'des'
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.t-grid_header')?.textContent).toContain(DOWN_CARET_UNICODE);
  });

  it('should have clickable class', () => {
    const fixture = TestBed.createComponent(TColumnComponent);
    fixture.componentInstance.sortable = true
    fixture.componentInstance.globalSortable = true
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.t-grid_header')?.classList).toContain('clickable');
  });

  it('should not have clickable class', () => {
    const fixture = TestBed.createComponent(TColumnComponent);
    fixture.componentInstance.sortable = false
    fixture.componentInstance.globalSortable = true
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.t-grid_header')?.classList).not.toContain('clickable');
  });

  it('should not have clickable class', () => {
    const fixture = TestBed.createComponent(TColumnComponent);
    fixture.componentInstance.sortable = true
    fixture.componentInstance.globalSortable = false
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.t-grid_header')?.classList).not.toContain('clickable');
  });

  it('should have content', () => {
    const TEST_DATA = [
      'item 1',
      'item 2',
      'item 3'
    ]

    const fixture: ComponentFixture<TColumnComponent<string>> = TestBed.createComponent<TColumnComponent<string>>(TColumnComponent<string>);
    fixture.componentInstance.data = TEST_DATA
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    console.log(compiled.querySelector('.t-grid_item'))
    expect(compiled.querySelectorAll('.t-grid_item')?.length).toBe(3);

    for (const i of TEST_DATA.keys()) {
      expect(compiled.querySelectorAll('.t-grid_item')?.item(i).textContent).toBe(TEST_DATA[i]);
    }
  });
});

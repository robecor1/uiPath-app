import {TestBed} from '@angular/core/testing';
import {TProgressComponent} from './t-progress.component';
import {By} from "@angular/platform-browser";

describe('TColumn', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      TProgressComponent
    ]
  }));

  it('should create the loader', () => {
    const fixture = TestBed.createComponent(TProgressComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have correct radius', () => {
    const fixture = TestBed.createComponent(TProgressComponent);
    const TEST_RADIUS = 100

    fixture.componentInstance.radius = TEST_RADIUS
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.t-progress_container')?.clientHeight).toBe(TEST_RADIUS);
    expect(compiled.querySelector('.t-progress_container')?.clientWidth).toBe(TEST_RADIUS);
  });

  it('should have correct progress - fill', () => {
    const fixture = TestBed.createComponent(TProgressComponent);
    const TEST_PROGRESS = 10

    fixture.componentInstance.radius = 100
    fixture.componentInstance.progress = TEST_PROGRESS
    fixture.componentInstance.type = 'fill'
    fixture.detectChanges();
    const fillElement = fixture.debugElement.query(By.css('.t-progress_fill'));
    expect(fillElement.styles['top']).toBe(`${100 - TEST_PROGRESS}%`);
  });

  it('should have correct progress - clock', () => {
    const fixture = TestBed.createComponent(TProgressComponent);
    const TEST_PROGRESS = 80

    fixture.componentInstance.radius = 100
    fixture.componentInstance.progress = TEST_PROGRESS
    fixture.componentInstance.type = 'clock'
    fixture.detectChanges();
    const rightFillElement = fixture.debugElement.query(By.css('.t-progress_right>.t-progress_fill'));
    const leftFillElement = fixture.debugElement.query(By.css('.t-progress_left>.t-progress_fill'));
    expect(rightFillElement.styles['transform']).toBe(`rotate(180deg)`);
    expect(leftFillElement.styles['transform']).toBe(`rotate(${180 * (TEST_PROGRESS - 50) / 50}deg)`);
  });

  it('should have correct color', () => {
    const fixture = TestBed.createComponent(TProgressComponent);
    const TEST_COLOR = 'red'

    fixture.componentInstance.color = TEST_COLOR
    fixture.detectChanges();
    const fillElement = fixture.debugElement.query(By.css('.t-progress_fill'));
    expect(fillElement.styles['background-color']).toBe(TEST_COLOR);
  });
});

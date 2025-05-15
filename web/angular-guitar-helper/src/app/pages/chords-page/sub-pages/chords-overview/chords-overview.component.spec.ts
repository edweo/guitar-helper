import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordsOverviewComponent } from './chords-overview.component';

describe('ChordsOverviewComponent', () => {
  let component: ChordsOverviewComponent;
  let fixture: ComponentFixture<ChordsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChordsOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChordsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

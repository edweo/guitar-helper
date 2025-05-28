import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordsReorderDialogComponent } from './chords-reorder-dialog.component';

describe('ChordsReorderComponent', () => {
  let component: ChordsReorderDialogComponent;
  let fixture: ComponentFixture<ChordsReorderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChordsReorderDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChordsReorderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

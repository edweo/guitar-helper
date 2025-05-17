import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordsSelectionButtonComponent } from './chords-selection-button.component';

describe('ChordsSelectionButtonComponent', () => {
  let component: ChordsSelectionButtonComponent;
  let fixture: ComponentFixture<ChordsSelectionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChordsSelectionButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChordsSelectionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

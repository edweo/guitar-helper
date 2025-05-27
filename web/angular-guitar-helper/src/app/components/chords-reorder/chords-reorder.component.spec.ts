import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordsReorderComponent } from './chords-reorder.component';

describe('ChordsReorderComponent', () => {
  let component: ChordsReorderComponent;
  let fixture: ComponentFixture<ChordsReorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChordsReorderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChordsReorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

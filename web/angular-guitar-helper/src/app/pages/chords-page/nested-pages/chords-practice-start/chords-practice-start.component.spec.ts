import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordsPracticeStartComponent } from './chords-practice-start.component';

describe('ChordsPracticeStartComponent', () => {
  let component: ChordsPracticeStartComponent;
  let fixture: ComponentFixture<ChordsPracticeStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChordsPracticeStartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChordsPracticeStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

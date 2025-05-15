import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordsPracticeComponent } from './chords-practice.component';

describe('ChordsPracticeComponent', () => {
  let component: ChordsPracticeComponent;
  let fixture: ComponentFixture<ChordsPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChordsPracticeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChordsPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

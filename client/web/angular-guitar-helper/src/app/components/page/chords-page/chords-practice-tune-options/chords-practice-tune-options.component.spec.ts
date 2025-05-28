import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordsPracticeTuneOptionsComponent } from './chords-practice-tune-options.component';

describe('ChordsPracticeTuneOptionsComponent', () => {
  let component: ChordsPracticeTuneOptionsComponent;
  let fixture: ComponentFixture<ChordsPracticeTuneOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChordsPracticeTuneOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChordsPracticeTuneOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

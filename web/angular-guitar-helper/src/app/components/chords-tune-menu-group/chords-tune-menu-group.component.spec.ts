import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordsTuneMenuGroupComponent } from './chords-tune-menu-group.component';

describe('ChordsTuneMenuGroupComponent', () => {
  let component: ChordsTuneMenuGroupComponent;
  let fixture: ComponentFixture<ChordsTuneMenuGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChordsTuneMenuGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChordsTuneMenuGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

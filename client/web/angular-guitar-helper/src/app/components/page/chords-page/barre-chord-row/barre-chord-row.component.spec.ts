import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarreChordRowComponent } from './barre-chord-row.component';

describe('BarreChordRowComponent', () => {
  let component: BarreChordRowComponent;
  let fixture: ComponentFixture<BarreChordRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarreChordRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarreChordRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

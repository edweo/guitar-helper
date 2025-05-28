import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordsCarouselComponent } from './chords-carousel.component';

describe('ChordsCarouselComponent', () => {
  let component: ChordsCarouselComponent;
  let fixture: ComponentFixture<ChordsCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChordsCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChordsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

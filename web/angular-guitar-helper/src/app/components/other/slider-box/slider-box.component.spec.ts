import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderBoxComponent } from './slider-box.component';

describe('SliderBoxComponent', () => {
  let component: SliderBoxComponent;
  let fixture: ComponentFixture<SliderBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

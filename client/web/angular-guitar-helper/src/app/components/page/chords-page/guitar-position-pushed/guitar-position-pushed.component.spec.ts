import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuitarPositionPushedComponent } from './guitar-position-pushed.component';

describe('GuitarPositionPushedComponent', () => {
  let component: GuitarPositionPushedComponent;
  let fixture: ComponentFixture<GuitarPositionPushedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuitarPositionPushedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuitarPositionPushedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

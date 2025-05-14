import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInfoImageComponent } from './card-info-image.component';

describe('CardInfoImageComponent', () => {
  let component: CardInfoImageComponent;
  let fixture: ComponentFixture<CardInfoImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardInfoImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardInfoImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordsGalleryReorderComponent } from './chords-gallery-reorder.component';

describe('ChordsGalleryReorderComponent', () => {
  let component: ChordsGalleryReorderComponent;
  let fixture: ComponentFixture<ChordsGalleryReorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChordsGalleryReorderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChordsGalleryReorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

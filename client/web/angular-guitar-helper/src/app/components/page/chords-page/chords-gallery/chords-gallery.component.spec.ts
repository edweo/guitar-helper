import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordsGalleryComponent } from './chords-gallery.component';

describe('ChordsGalleryComponent', () => {
  let component: ChordsGalleryComponent;
  let fixture: ComponentFixture<ChordsGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChordsGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChordsGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

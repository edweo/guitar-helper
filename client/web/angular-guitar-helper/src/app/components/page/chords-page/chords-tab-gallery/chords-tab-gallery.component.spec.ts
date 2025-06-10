import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordsTabGalleryComponent } from './chords-tab-gallery.component';

describe('ChordsTabGalleryComponent', () => {
  let component: ChordsTabGalleryComponent;
  let fixture: ComponentFixture<ChordsTabGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChordsTabGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChordsTabGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordsPageComponent } from './chords-page.component';

describe('ChordsPageComponent', () => {
  let component: ChordsPageComponent;
  let fixture: ComponentFixture<ChordsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChordsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChordsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

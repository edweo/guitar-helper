import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordsMainPageComponent } from './chords-main-page.component';

describe('ChordsMainPageComponent', () => {
  let component: ChordsMainPageComponent;
  let fixture: ComponentFixture<ChordsMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChordsMainPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChordsMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

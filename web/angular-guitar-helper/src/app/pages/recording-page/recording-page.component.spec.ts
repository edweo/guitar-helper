import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingPageComponent } from './recording-page.component';

describe('RecordingPageComponent', () => {
  let component: RecordingPageComponent;
  let fixture: ComponentFixture<RecordingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

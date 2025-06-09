import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenMutedStringComponent } from './open-muted-string.component';

describe('OpenMutedStringComponent', () => {
  let component: OpenMutedStringComponent;
  let fixture: ComponentFixture<OpenMutedStringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenMutedStringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenMutedStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

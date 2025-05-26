import { TestBed } from '@angular/core/testing';

import { ChordsPracticeService } from './chords-practice.service';

describe('ChordsPracticeService', () => {
  let service: ChordsPracticeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChordsPracticeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

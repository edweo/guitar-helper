import { TestBed } from '@angular/core/testing';

import { ChordsPracticeTuneService } from './chords-practice-tune.service';

describe('ChordsPracticeTuneService', () => {
  let service: ChordsPracticeTuneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChordsPracticeTuneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

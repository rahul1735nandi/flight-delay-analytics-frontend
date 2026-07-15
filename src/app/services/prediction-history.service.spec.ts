import { TestBed } from '@angular/core/testing';

import { PredictionHistoryService } from './prediction-history.service';

describe('PredictionHistoryService', () => {
  let service: PredictionHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PredictionHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

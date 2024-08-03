import { TestBed } from '@angular/core/testing';

import { GetPredictionService } from './get-prediction.service';

describe('GetPredictionService', () => {
  let service: GetPredictionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPredictionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

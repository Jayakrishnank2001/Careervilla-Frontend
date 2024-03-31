import { TestBed } from '@angular/core/testing';

import { ReportedJobService } from './reported-job.service';

describe('ReportedJobService', () => {
  let service: ReportedJobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportedJobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

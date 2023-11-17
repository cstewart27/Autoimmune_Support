import { TestBed } from '@angular/core/testing';

import { AvatorService } from './avator.service';

describe('AvatorService', () => {
  let service: AvatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

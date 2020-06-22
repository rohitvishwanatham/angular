import { TestBed } from '@angular/core/testing';

import { PomotionsService } from './pomotions.service';

describe('PomotionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PomotionsService = TestBed.get(PomotionsService);
    expect(service).toBeTruthy();
  });
});

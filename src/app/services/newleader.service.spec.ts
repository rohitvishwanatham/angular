import { TestBed } from '@angular/core/testing';

import { NewleaderService } from './newleader.service';

describe('NewleaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewleaderService = TestBed.get(NewleaderService);
    expect(service).toBeTruthy();
  });
});

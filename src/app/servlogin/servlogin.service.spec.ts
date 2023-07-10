import { TestBed } from '@angular/core/testing';

import { ServloginService } from './servlogin.service';

describe('ServloginService', () => {
  let service: ServloginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServloginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CustomersListService } from './customers-list.service';

describe('CustomersListService', () => {
  let service: CustomersListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomersListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

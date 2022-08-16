import { TestBed } from '@angular/core/testing';

import { MethodOfPaymentService } from './method-of-payment.service';

describe('MethodOfPaymentService', () => {
  let service: MethodOfPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MethodOfPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

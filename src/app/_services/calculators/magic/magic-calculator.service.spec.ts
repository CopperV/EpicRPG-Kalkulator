/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MagicCalculatorService } from './magic-calculator.service';

describe('Service: MagicCalculator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MagicCalculatorService]
    });
  });

  it('should ...', inject([MagicCalculatorService], (service: MagicCalculatorService) => {
    expect(service).toBeTruthy();
  }));
});

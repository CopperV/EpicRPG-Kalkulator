/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DefenseCalculatorService } from './defense-calculator.service';

describe('Service: DefenseCalculator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefenseCalculatorService]
    });
  });

  it('should ...', inject([DefenseCalculatorService], (service: DefenseCalculatorService) => {
    expect(service).toBeTruthy();
  }));
});

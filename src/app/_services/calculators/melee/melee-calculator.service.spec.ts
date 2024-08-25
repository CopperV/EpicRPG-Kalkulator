/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MeleeCalculatorService } from './melee-calculator.service';

describe('Service: MeleeCalculator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeleeCalculatorService]
    });
  });

  it('should ...', inject([MeleeCalculatorService], (service: MeleeCalculatorService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProjectileCalculatorService } from './projectile-calculator.service';

describe('Service: ProjectileCalculator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectileCalculatorService]
    });
  });

  it('should ...', inject([ProjectileCalculatorService], (service: ProjectileCalculatorService) => {
    expect(service).toBeTruthy();
  }));
});

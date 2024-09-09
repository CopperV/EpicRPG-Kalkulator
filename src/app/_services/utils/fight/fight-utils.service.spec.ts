/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FightUtilsService } from './fight-utils.service';

describe('Service: FightUtils', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FightUtilsService]
    });
  });

  it('should ...', inject([FightUtilsService], (service: FightUtilsService) => {
    expect(service).toBeTruthy();
  }));
});

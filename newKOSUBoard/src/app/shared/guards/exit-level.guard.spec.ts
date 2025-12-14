import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { exitLevelGuard } from './exit-level.guard';

describe('exitLevelGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => exitLevelGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

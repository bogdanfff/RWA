import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { gameplayGuard } from './gameplay.guard';

describe('gameplayGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => gameplayGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

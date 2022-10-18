import { TestBed } from '@angular/core/testing';

import { AtropossSampleModuleService } from './atroposs-sample-module.service';

describe('AtropossSampleModuleService', () => {
  let service: AtropossSampleModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtropossSampleModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

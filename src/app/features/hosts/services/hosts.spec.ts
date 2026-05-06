import { TestBed } from '@angular/core/testing';

import { Hosts } from './hosts';

describe('Hosts', () => {
  let service: Hosts;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Hosts);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ThePeopleService } from './the-people.service';

describe('ThePeopleService', () => {
  let service: ThePeopleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThePeopleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

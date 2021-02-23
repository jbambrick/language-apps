import { TestBed } from '@angular/core/testing';

import { DictionarySearchService } from './dictionary-search.service';

describe('DictionarySearchService', () => {
  let service: DictionarySearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DictionarySearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

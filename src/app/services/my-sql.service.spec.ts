import { TestBed, inject } from '@angular/core/testing';

import { MySqlServiceService } from './my-sql-service.service';

describe('MySqlServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MySqlServiceService]
    });
  });

  it('should be created', inject([MySqlServiceService], (service: MySqlServiceService) => {
    expect(service).toBeTruthy();
  }));
});

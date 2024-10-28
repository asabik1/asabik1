import { of } from 'rxjs';

export class GlobalSettingsServiceMock {
  getGlobalSettings() {
    return of({
      MAX_RETURN_TERM_WO_MANUAL_PROCESSING: 3,
      R: 0,
      M: 1.05,
      A: 0,
      RAISING_TIME_LIMIT: 7,
      APPLICATION_FEE: 500,
      MIN_LOAN: 2000,
      MAX_LOAN: 50000,
    });
  }
}

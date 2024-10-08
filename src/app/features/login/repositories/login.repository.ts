import { environment } from '../../../../environments/environment';
import { delay, map, Observable, of } from 'rxjs';
import {
  ApiResponseBody,
  RepositoryResult,
} from '../../../shared/services/http/http.types';
import { HttpService } from '../../../shared/services/http/http.service';
import { LoginResult } from '../types/login.types';
import { HttpStatusCode } from '@angular/common/http';

export class LoginRepository {
  constructor(private http: HttpService) {}

  login(credentials: {
    username: string;
    password: string;
  }): Observable<RepositoryResult<any>> {
    // const endpoint = `${environment.baseUrl}/user/login`;
    // return this.http.post<ApiResponseBody<unknown>>(endpoint, credentials).pipe(
    //   map((val, _) => {
    //     return {
    //       status: val.status,
    //       result: val.body?.result,
    //     };
    //   })
    // );

    let status = HttpStatusCode.Ok;

    switch (credentials.username) {
      case 'error':
        status = HttpStatusCode.InternalServerError
        break;
      case 'warning':
        status = HttpStatusCode.BadRequest
        break;
    }
    const mockResult: RepositoryResult<any> = {
      status: status,
    };
    return of(mockResult).pipe(delay(2000));
  }
}

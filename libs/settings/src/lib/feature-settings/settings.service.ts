import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserResponse } from '@asiforg/core';
import { ApiService } from '@asiforg/core';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  constructor(private apiService: ApiService) {}

  update(user: User): Observable<UserResponse> {
    return this.apiService.put<UserResponse, UserResponse>('/user', { user });
  }
}

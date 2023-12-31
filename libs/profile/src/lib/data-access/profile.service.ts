import { Profile, ProfileResponse } from '@asiforg/core';
import { ApiService } from '@asiforg/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(private apiService: ApiService) {}

  getProfile(username: string): Observable<Profile> {
    return this.apiService.get<ProfileResponse>('/profiles/' + username).pipe(map((data) => data.profile));
  }
}

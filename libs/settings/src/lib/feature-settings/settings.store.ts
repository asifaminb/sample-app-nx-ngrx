import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ComponentStore } from '@ngrx/component-store';
import { concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { authActions } from '@asiforg/auth';
import { ngrxFormsQuery } from '@asiforg/core';
import { pipe } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';
import { SettingsService } from './settings.service';

@Injectable()
export class SettingsStoreService extends ComponentStore<Record<string, unknown>> {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly router: Router,
    private readonly store: Store,
  ) {
    super({});
  }

  // EFFECTS
  readonly updateSettings = this.effect<void>(
    pipe(
      concatLatestFrom(() => [this.store.select(ngrxFormsQuery.selectData)]),
      concatMap(([, data]) =>
        this.settingsService.update(data).pipe(
          tap((result) => this.router.navigate(['profile', result.user.username])),
          map(() => this.store.dispatch(authActions.getUser())),
        ),
      ),
    ),
  );
}

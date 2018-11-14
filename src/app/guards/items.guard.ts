import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '../store/app.reducers';
import * as itemActions from '../store/item/item.actions';
import * as fromSelectors from '../store/item/item.selectors';

@Injectable()
export class ItemsGuard implements CanActivate {
  constructor(private store: Store<fromStore.AppState>) { }

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromSelectors.getItemsLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new itemActions.getItems('items'));
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}

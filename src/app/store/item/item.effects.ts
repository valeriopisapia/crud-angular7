import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { AngularFireDatabase } from '@angular/fire/database';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as itemActions from './item.actions';
import { Items } from 'src/app/models/items';

export type Action = itemActions.ItemActions;

@Injectable()
export class ItemEffects {
  constructor(private actions: Actions, private db: AngularFireDatabase) { }

  @Effect()
  getItems: Observable<Action> = this.actions
    .ofType(itemActions.GET_ITEMS)
    .pipe(switchMap((action: itemActions.getItems) => {
      return this.db.list('items').valueChanges();
    }), map(
      (items: Items[]) =>
        new itemActions.getItemsSuccess(items)
    ));

  @Effect()
  addItem = this.actions
    .ofType(itemActions.ITEM_CREATE)
    .pipe(switchMap((action: itemActions.createItem) => {
      const items = this.db.list('items');
      action.payload.id = -1;
      return items.push(action.payload)
    }), map(
      (item) => {
        this.db.object(`items/${item.key}`).update({ id: item.key });
        return {
          type: itemActions.ITEM_CREATE_SUCCESS
        };
      }
    ));

  @Effect()
  editItem = this.actions
    .ofType(itemActions.ITEM_UPDATE)
    .pipe(switchMap((action: itemActions.updateItem) => {
      return this.db.object(`items/${action.payload.index}`).update(action.payload.updatedItem)
    }), map(
      (item) => {
        return {
          type: itemActions.ITEM_UPDATE_SUCCESS
        };
      }
    ));

  @Effect()
  removeItem = this.actions.ofType(itemActions.ITEM_REMOVE)
    .pipe(switchMap((action: itemActions.removeItem) => {
      return this.db.object('/items/' + action.payload.index).remove();
    }), map(
      (item) => {
        return {
          type: itemActions.ITEM_REMOVE_SUCCESS
        };
      }
    ));
}
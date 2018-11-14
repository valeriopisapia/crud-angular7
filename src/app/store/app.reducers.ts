import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromItem from './item/item.reducers';
import * as fromState from './item/item.state';

export interface AppState {
  items: fromState.State
}

export const reducers: ActionReducerMap<AppState> = {
  items: fromItem.itemReducer
};

// export const getItemsState = createFeatureSelector<AppState>('items');
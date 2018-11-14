import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import { featureAdapter, State } from './item.state';
import { Items } from 'src/app/models/items';
import * as fromItems from 'src/app/store/item/item.reducers';
 
export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectItemState = createFeatureSelector<State>('items');

export const selectAllItems: (
  state: object
) => Items[] = featureAdapter.getSelectors(selectItemState).selectAll;

export const selectItemById = (id: string) =>
  createSelector(selectAllItems, (allItems: Items[]) => {
    if (allItems) {
      return allItems.find(p => p.id.toString() === id);
    } else {
      return null;
    }
  });

  export const getItemsLoaded = createSelector(
    selectItemState,
    fromItems.getItemsLoaded
  );

export const selectItemError = createSelector(
  selectItemState,
  getError
);

export const selectItemIsLoading = createSelector(selectItemState, getIsLoading);
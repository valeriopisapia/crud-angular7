import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  ItemsStoreSelectors
} from './item';

export const selectError: MemoizedSelector<object, string> = createSelector(
  ItemsStoreSelectors.selectItemError,
  (itemError: string) => {
    return itemError;
  }
);

export const selectIsLoading: MemoizedSelector<
  object,
  boolean
  > = createSelector(
    ItemsStoreSelectors.selectItemIsLoading,
    (loaded: boolean) => {
      return loaded;
    }
  );
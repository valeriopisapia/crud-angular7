import * as itemActions from './item.actions';
import { initialState, featureAdapter, State } from './item.state';

export function itemReducer(state = initialState, action: itemActions.ItemActions) {
  switch (action.type) {
    case itemActions.GET_ITEMS:
      return {
        ...state, loading: true, error: null
      };
    case itemActions.GET_ITEMS_SUCCESS:
      console.log('GET_ITEMS_SUCCESS', {
        ...state, items: [...action.payload], loading: false, loaded: true
      });
      return featureAdapter.addAll(action.payload, {
        ...state,
        isLoading: false,
        error: null,
        loaded: true
      });
    case itemActions.GET_ITEM:
      return {
        ...state, loading: true
      };
    case itemActions.GET_ITEM_SUCCESS:
      return featureAdapter.addOne(action.payload, {
        ...state,
        loading: true
      })
    case itemActions.ITEM_CREATE:
      return featureAdapter.addOne(action.payload, {
        ...state,
        loading: false
      })
    case itemActions.ITEM_CREATE_SUCCESS:
      return {
        ...state, loading: false
      }
    case itemActions.ITEM_CREATE_FAIL:
      return {
        ...state, loading: false
      }
    case itemActions.ITEM_UPDATE:
      return featureAdapter.updateOne({
        id: action.payload.index,
        changes: action.payload.updatedItem
      }, state);
    case itemActions.ITEM_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case itemActions.ITEM_UPDATE_FAIL:
      return {
        ...state,
        loading: false
      }
    case itemActions.ITEM_REMOVE:
      return featureAdapter.removeOne(action.payload.index, state);
    case itemActions.ITEM_REMOVE_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case itemActions.ITEM_REMOVE_FAIL:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
}

export const getItemsLoaded = (state: State) => state.loaded;
// export const getItems = (state: State) => state.items;
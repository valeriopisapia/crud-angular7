import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Items } from 'src/app/models/items';

export const featureAdapter: EntityAdapter<
  Items
  > = createEntityAdapter<Items>({
    selectId: model => model.id,
    sortComparer: (a: Items, b: Items): number =>
      b.id.toString().localeCompare(a.id.toString())
  });

  
export interface State extends EntityState<Items> {
  error?: any;
  loaded?: boolean;
  loading?: boolean;
  isLoading?: boolean;
}

export const initialState: State = featureAdapter.getInitialState(
  {
    loading: false,
    error: null,
    loaded: false
  })

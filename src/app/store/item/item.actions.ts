import { Action } from '@ngrx/store';
import { Items } from 'src/app/models/items';


export const GET_ITEMS = 'Items get';
export const GET_ITEMS_SUCCESS = 'Items get success';

export const GET_ITEM = 'Item get';
export const GET_ITEM_SUCCESS = 'Item get success';

export const ITEM_CREATE = 'Item create';
export const ITEM_CREATE_SUCCESS = 'Item create success';
export const ITEM_CREATE_FAIL = 'Item create fail';

export const ITEM_UPDATE = 'Item update';
export const ITEM_UPDATE_SUCCESS = 'Item update success';
export const ITEM_UPDATE_FAIL = 'Item update fail';

export const ITEM_REMOVE = 'Item remove';
export const ITEM_REMOVE_SUCCESS = 'Item remove success';
export const ITEM_REMOVE_FAIL = 'Item remove fail';

/* GET ITEMS */
export class getItems implements Action {
  readonly type = GET_ITEMS;
  constructor(public payload: string) { };
}

export class getItemsSuccess implements Action {
  readonly type = GET_ITEMS_SUCCESS;
  constructor(public payload: Items[]) { };
}

/* GET ITEM */
export class getItem implements Action {
  readonly type = GET_ITEM;
  constructor(public payload: string) { };
}

export class getItemSuccess implements Action {
  readonly type = GET_ITEM_SUCCESS;
  constructor(public payload: Items) { };
}

/* CREATE ITEM */
export class createItem implements Action {
  readonly type = ITEM_CREATE;
  constructor(public payload: Items) { };
}

export class createItemSuccess implements Action {
  readonly type = ITEM_CREATE_SUCCESS;
}

export class createItemFail implements Action {
  readonly type = ITEM_CREATE_FAIL;
  constructor(public payload: string) { };
}

/* UPDATE ITEM */
export class updateItem implements Action {
  readonly type = ITEM_UPDATE;
  constructor(public payload: { index: string, updatedItem: Items }) { }
}

export class updateItemSuccess implements Action {
  readonly type = ITEM_UPDATE_SUCCESS;
}

export class updateItemFail implements Action {
  readonly type = ITEM_UPDATE_FAIL;
  constructor(public payload: string) { };
}

/* REMOVE ITEM */
export class removeItem implements Action {
  readonly type = ITEM_REMOVE;
  constructor(public payload: { index: string }) { }
}

export class removeItemSuccess implements Action {
  readonly type = ITEM_REMOVE_SUCCESS;
}

export class removeItemFail implements Action {
  readonly type = ITEM_REMOVE_FAIL;
  constructor(public payload: string) { };
}


export type ItemActions = getItems |
  getItemsSuccess |
  getItem |
  getItemSuccess |
  createItem |
  createItemSuccess |
  createItemFail |
  updateItem |
  updateItemSuccess |
  updateItemFail |
  removeItem |
  removeItemSuccess |
  removeItemFail;
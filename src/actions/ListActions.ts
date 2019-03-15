import * as ActionType from './ActionTypes';
import { IAction } from './IAction';
import { ListSorting } from '../constants/ListSorting';
import { requestAddItemCreator } from './fetchActions/requestAddItem';
import { fetchItems, storeItem, deleteItem, editItem } from '../utils/fetchFactory';
import { requestAllItemsCreator } from './fetchActions/requestAllItems';
import { requestDeleteItemCreator } from './fetchActions/requestDeleteItem';
import { requestEditItemCreator } from './fetchActions/requestEditItem';

export const toggleItem = (id: Uuid): IAction => ({
  type: ActionType.ToggleItem,
  payload: {
    id
  }
});

export const setListSorting = (listView: ListSorting): IAction => ({
  type: ActionType.SetListSorting,
  payload: {
    sorting: listView
  }
});

export const requestAddItem = requestAddItemCreator({fetchAddItem: storeItem});

export const requestAllItems = requestAllItemsCreator({fetchAllItems: fetchItems});

export const requestDeleteItem = requestDeleteItemCreator({fetchDeleteItem: deleteItem});

export const requestSaveItem = requestEditItemCreator({fetchEditItem: editItem});

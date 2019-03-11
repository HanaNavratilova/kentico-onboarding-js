import * as ActionType from './ActionTypes';
import { IAction } from './IAction';
import { ListSorting } from '../constants/ListSorting';
import { requestAddItemCreator } from './fetchActions/requestAddItem';
import { storeItem } from '../utils/fetchFactory';

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

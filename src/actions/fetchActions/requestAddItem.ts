import { Dispatch } from 'redux';
import { IAction } from '../IAction';
import * as ActionType from '../ActionTypes';

import { ListItem } from '../../models/ListItem';

const fetchingStarts = (itemText: string): IAction => ({
  type: ActionType.FetchAddItemStarted,
  payload: {
    text: itemText
  }
});

const fetchingFailed = (errorMessage: string): IAction => ({
  type: ActionType.FetchAddItemFailed,
  payload: {
    errorMessage
  }
});

export const fetchingSucceeded = (item: ListItem): IAction => ({
  type: ActionType.FetchAddItemSucceeded,
  payload: {
    ...item
  }
});

interface IAddItemCreatorDependency {
  readonly fetchAddItem: (itemText: string) => Promise<ListItem>;
}

export const requestAddItemCreator = (dependency: IAddItemCreatorDependency) => (itemText: string) =>
  async (dispatch: Dispatch): Promise<IAction> => {
    dispatch(fetchingStarts(itemText));

    try {
      const item = await dependency.fetchAddItem(itemText);

      return dispatch(fetchingSucceeded(item));
    } catch (error) {
      console.error(error);
      return dispatch(fetchingFailed(error.message));
    }
  };




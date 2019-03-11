import { Dispatch } from 'redux';
import { IAction } from '../IAction';
import * as ActionType from '../ActionTypes';

import { ListItem } from '../../models/ListItem';

const fetchingStarts = (): IAction => ({
  type: ActionType.FetchItemsStarted,
  payload: {}
});

const fetchingFailed = (): IAction => ({
  type: ActionType.FetchItemsFailed,
  payload: {}
});

const fetchingSucceeded = (items: ListItem[]): IAction => ({
  type: ActionType.FetchItemsSucceeded,
  payload: {
    items
  }
});

interface IRequestAllItemsCreatorDependency {
  readonly fetchAllItems: () => Promise<ListItem[]>;
}

export const requestAllItemsCreator = (dependency: IRequestAllItemsCreatorDependency) =>
  async (dispatch: Dispatch): Promise<IAction> => {
    dispatch(fetchingStarts());

    try {
      const items = await dependency.fetchAllItems();

      return dispatch(fetchingSucceeded(items));
    } catch (error) {
      return dispatch(fetchingFailed());
    }
  };


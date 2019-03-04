import * as fetch from 'isomorphic-fetch';
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

export const requestAllItemsCreator = (myFetch: (path: string, options?: RequestInit) => Promise<Response>) => (dispatch: Dispatch): Promise<IAction> => {
  dispatch(fetchingStarts());

  return myFetch('api/v1.0/List', {method: 'GET'})
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error();
    })
    .then(items => dispatch(fetchingSucceeded(items)))
    .catch(_ => {
        dispatch(fetchingFailed());
        throw new Error();
      }
    );
};

export const requestAllItems = requestAllItemsCreator(fetch);


import * as fetch from 'isomorphic-fetch';
import { Dispatch } from 'redux';
import { IAction } from '../IAction';
import * as ActionType from '../ActionTypes';

import { ListItem } from '../../models/ListItem';

const fetchingStarts = (): IAction => ({
  type: ActionType.FetchAddItemStarted,
  payload: {}
});

const fetchingFailed = (): IAction => ({
  type: ActionType.FetchAddItemFailed,
  payload: {}
});

const fetchingSucceeded = (item: ListItem): IAction => ({
  type: ActionType.FetchAddItemSucceeded,
  payload: {
    ...item
  }
});

export const requestAddItemCreator = (myFetch: (path: string, options?: RequestInit) => Promise<Response>) => (itemText: string) => (dispatch: Dispatch): Promise<IAction> => {
  dispatch(fetchingStarts());

  return myFetch(
    'api/v1.0/List',
    {
      method: 'POST',
      body: JSON.stringify({text: itemText}),
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error();
    })
    .then(item => dispatch(fetchingSucceeded(item)))
    .catch(_ => {
        dispatch(fetchingFailed());
        throw new Error();
      }
    );
};

export const requestAddItem = requestAddItemCreator(fetch);


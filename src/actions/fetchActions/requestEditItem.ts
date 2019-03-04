import * as fetch from 'isomorphic-fetch';
import { Dispatch } from 'redux';
import { IAction } from '../IAction';
import * as ActionType from '../ActionTypes';
import { ListItem } from '../../models/ListItem';

const fetchingStarts = (): IAction => ({
  type: ActionType.FetchEditItemStarted,
  payload: {}
});

const fetchingFailed = (): IAction => ({
  type: ActionType.FetchEditItemFailed,
  payload: {}
});

export const fetchingSucceeded = (item: ListItem): IAction => ({
  type: ActionType.FetchEditItemSucceeded,
  payload: {
    ...item
  }
});

export const requestEditItemCreator = (myFetch: (path: string, options?: RequestInit) => Promise<Response>) => (id: string, body: string) => (dispatch: Dispatch): Promise<IAction> => {
  dispatch(fetchingStarts());

  return myFetch(
    'api/v1.0/List/' + id,
    {
      method: 'PUT',
      body,
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

export const requestSaveItem = (id: string, text: string) => requestEditItemCreator(fetch)(id, JSON.stringify({ text }));

// export const requestToggleItem = (id: string) => requestEditItemCreator(fetch)(id, {text: 'somupravil', isActive: false });


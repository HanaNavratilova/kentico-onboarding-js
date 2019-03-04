import * as fetch from 'isomorphic-fetch';
import { Dispatch } from 'redux';
import { IAction } from '../IAction';
import * as ActionType from '../ActionTypes';

const fetchingStarts = (): IAction => ({
  type: ActionType.FetchDeleteItemStarted,
  payload: {}
});

const fetchingFailed = (): IAction => ({
  type: ActionType.FetchDeleteItemFailed,
  payload: {}
});

const fetchingSucceeded = (id: Uuid): IAction => ({
  type: ActionType.FetchDeleteItemSucceeded,
  payload: {
    id
  }
});

export const requestDeleteItemCreator = (myFetch: (path: string, options?: RequestInit) => Promise<Response>) => (id: Uuid) => (dispatch: Dispatch): Promise<IAction> => {
  dispatch(fetchingStarts());

  return myFetch(
    'api/v1.0/List/' + id,
    {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        return;
      }

      throw new Error();
    })
    .then(_ => dispatch(fetchingSucceeded(id)))
    .catch(_ => {
        dispatch(fetchingFailed());
        throw new Error();
      }
    );
};

export const requestDeleteItem = requestDeleteItemCreator(fetch);


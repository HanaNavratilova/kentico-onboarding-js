import * as fetch from 'isomorphic-fetch';
import { Dispatch } from 'redux';
import { IAction } from '../IAction';
import * as ActionType from '../ActionTypes';
import { toast } from 'react-toastify';
import { ListItem } from '../../models/ListItem';
import 'react-toastify/dist/ReactToastify.css';

const fetchingStarts = (): IAction => ({
  type: ActionType.FetchItemsStarted,
  payload: {}
});

const fetchingFailed = (): IAction => {
  toast.error('🦄 Wow so easy!', {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false
  });
  return {
    type: ActionType.FetchItemsFailed,
    payload: {}
  };
};

const fetchingSucceeded = (items: ListItem[]): IAction => ({
  type: ActionType.FetchItemsSucceeded,
  payload: {
    items
  }
});

const requestAllItemsCreator = (myFetch: typeof fetch) => (dispatch: Dispatch): Promise<IAction> => {
  dispatch(fetchingStarts());

  return myFetch('api/v1.0/List', { method: 'GET' })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error();
    })
    .then(items => dispatch(fetchingSucceeded(items)))
    .catch(_ => dispatch(fetchingFailed()));
};

export const requestAllItems = requestAllItemsCreator(fetch);


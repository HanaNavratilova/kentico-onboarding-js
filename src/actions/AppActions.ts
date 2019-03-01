import { IAction } from './IAction';
import * as ActionType from './ActionTypes';
import { ListItem } from '../models/ListItem';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const setLastUpdateTime = (lastUpdateTime: Time): IAction => ({
  type: ActionType.SetLastRenderTime,
  payload: {
    time: lastUpdateTime
  }
});

export const fetchingStarts = (): IAction => ({
  type: ActionType.FetchItemsStarted,
  payload: {}
});

export const fetchingFailed = (): IAction => {
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

export const fetchingSucceeded = (items: ListItem[]): IAction => ({
  type: ActionType.FetchItemsSucceeded,
  payload: {
    items
  }
});

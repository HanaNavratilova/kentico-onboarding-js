import { IAction } from './IAction';
import * as ActionType from './ActionTypes';
import { ListItem } from '../models/ListItem';

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

export const fetchingFailed = (): IAction => ({
  type: ActionType.FetchItemsFailed,
  payload: {}
});

export const fetchingSucceeded = (items: ListItem[]): IAction => ({
  type: ActionType.FetchItemsSucceeded,
  payload: {
    items
  }
});

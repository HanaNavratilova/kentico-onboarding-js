import * as ActionType from '../actions/ActionTypes';
import { IAction } from '../actions/IAction';

export const isInitialized = (state = false, action: IAction): boolean => {
  switch (action.type) {
    case ActionType.FetchItemsStarted:
      return false;

    case ActionType.FetchItemsSucceeded:
      return true;

    case ActionType.FetchItemsFailed:
      return false;

    default:
      return state;
  }
};

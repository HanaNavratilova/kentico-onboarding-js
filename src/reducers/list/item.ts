import * as ActionType from '../../actions/ActionTypes';
import { ListItem } from '../../models/ListItem';
import { IAction } from '../../actions/IAction';
// import { getLocalDateTime } from '../../utils/getLocalDateTime';

export const item = (state: ListItem = new ListItem(), action: IAction): ListItem => {
  switch (action.type) {
    case ActionType.FetchItemsSucceeded:
    case ActionType.FetchAddItemSucceeded:
      return new ListItem({
        ...action.payload,
        creationTime: action.payload.creationTime,
        lastUpdateTime: action.payload.lastUpdateTime
        // creationTime: getLocalDateTime(action.payload.creationTime),
        // lastUpdateTime: getLocalDateTime(action.payload.lastUpdateTime)
      });

    case ActionType.ToggleItem:
      return state.with({isActive: !state.isActive});

    case ActionType.FetchEditItemSucceeded: {
      // return state.with({text: action.payload.text, isActive: false, lastUpdateTime: getLocalDateTime(action.payload.lastUpdateTime)});
      return state.with({text: action.payload.text, isActive: false, lastUpdateTime: action.payload.lastUpdateTime});
    }

    default:
      return state;
  }
};

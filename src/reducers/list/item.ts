import * as ActionType from '../../actions/ActionTypes';
import { ListItem } from '../../models/ListItem';
import { IAction } from '../../actions/IAction';

export const item = (state: ListItem = new ListItem(), action: IAction): ListItem => {
  switch (action.type) {
    case ActionType.FetchAddItemSucceeded:
      return new ListItem({
        ...action.payload
      });

    case ActionType.ToggleItem:
      return state.with({isActive: !state.isActive});

    case ActionType.SaveItem: {
      return state.with({text: action.payload.text, isActive: false, lastUpdateTime: action.payload.updateTime});
    }

    case ActionType.FetchItemsSucceeded:
      return new ListItem({
        ...action.payload
      });

    default:
      return state;
  }
};

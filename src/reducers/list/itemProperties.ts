import * as ActionType from '../../actions/ActionTypes';
import { IAction } from '../../actions/IAction';
import { ItemStatus } from '../interfaces/ItemStatus';
import { ItemProperties } from '../../models/ItemProperties';

export const itemProperties = (state: ItemProperties = new ItemProperties(), action: IAction): ItemProperties => {
  switch (action.type) {
    case ActionType.FetchDeleteItemStarted:
    case ActionType.FetchEditItemStarted:
      return new ItemProperties({
        status: ItemStatus.BeingProcessed,
        newText: action.payload.text,
        errorMessage: '',
      });

    case ActionType.FetchEditItemSucceeded:
      return new ItemProperties(); // ItemStatus.NothingIsHappening and empty strings

    case ActionType.FetchDeleteItemFailed:
    case ActionType.FetchEditItemFailed:
      return state.with({status: ItemStatus.SavingFailed, errorMessage: action.payload.errorMessage});

    default:
      return state;
  }
};

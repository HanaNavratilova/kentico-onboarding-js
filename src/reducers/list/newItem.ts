import * as ActionType from '../../actions/ActionTypes';
import { IAction } from '../../actions/IAction';
import { ItemStatus } from '../interfaces/ItemStatus';
import { ItemProperties } from '../../models/ItemProperties';

export const itemProperties = (state: ItemProperties = new ItemProperties(), action: IAction): ItemProperties => {
  switch (action.type) {
    case ActionType.FetchAddItemStarted:
      return new ItemProperties({
        status: ItemStatus.BeingProcessed,
        newText: action.payload.text,
        errorMessage: '',
      });

    case ActionType.FetchAddItemSucceeded:
      return new ItemProperties(); // ItemStatus.NothingIsHappening and empty strings

    case ActionType.FetchAddItemFailed:
      return state.with({status: ItemStatus.SavingFailed, errorMessage: action.payload.errorMessage});

    default:
      return state;
  }
};

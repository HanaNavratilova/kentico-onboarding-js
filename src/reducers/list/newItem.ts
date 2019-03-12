import * as ActionType from '../../actions/ActionTypes';
import { IAction } from '../../actions/IAction';
import { ItemProperties, ItemStatus } from '../interfaces/ItemProperties';

export const newItem = (state: ItemProperties = {status: ItemStatus.NothingIsHappening, newText: '', errorMessage: ''}, action: IAction): ItemProperties => {
  switch (action.type) {
    case ActionType.FetchAddItemStarted:
      return {
        status: ItemStatus.BeingProcessed,
        newText: action.payload.text,
        errorMessage: '',
      };

    case ActionType.FetchAddItemSucceeded:
      return {
        status: ItemStatus.NothingIsHappening,
        newText: '',
        errorMessage: '',
      };

    case ActionType.FetchAddItemFailed:
      return {
        status: ItemStatus.SavingFailed,
        newText: state.newText,
        errorMessage: action.payload.errorMessage,
      };

    default:
      return state;
  }
};

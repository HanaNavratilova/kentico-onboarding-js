import { Dispatch } from 'redux';
import { IAction } from '../IAction';
import * as ActionType from '../ActionTypes';

const fetchingStarts = (id: Uuid): IAction => ({
  type: ActionType.FetchDeleteItemStarted,
  payload: {
    id
  }
});

const fetchingFailed = (id: Uuid, errorMessage: string): IAction => ({
  type: ActionType.FetchDeleteItemFailed,
  payload: {
    id,
    errorMessage
  }
});

export const fetchingSucceeded = (id: Uuid): IAction => ({
  type: ActionType.FetchDeleteItemSucceeded,
  payload: {
    id
  }
});

interface IRequestDeleteItemCreatorDependency {
  readonly fetchDeleteItem: (id: Uuid) => Promise<void>;
}

export const requestDeleteItemCreator = (dependency: IRequestDeleteItemCreatorDependency) => (id: Uuid) =>
  async (dispatch: Dispatch): Promise<IAction> => {
    dispatch(fetchingStarts(id));

    try {
      await dependency.fetchDeleteItem(id);

      return dispatch(fetchingSucceeded(id));
    } catch (error) {
      return dispatch(fetchingFailed(id, error.message));
    }
  };

import { Dispatch } from 'redux';
import { IAction } from '../IAction';
import * as ActionType from '../ActionTypes';

const fetchingStarts = (): IAction => ({
  type: ActionType.FetchDeleteItemStarted,
  payload: {}
});

const fetchingFailed = (): IAction => ({
  type: ActionType.FetchDeleteItemFailed,
  payload: {}
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
    dispatch(fetchingStarts());

    try {
      await dependency.fetchDeleteItem(id);

      return dispatch(fetchingSucceeded(id));
    } catch (error) {
      return dispatch(fetchingFailed());
    }
  };

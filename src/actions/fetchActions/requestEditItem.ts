import { Dispatch } from 'redux';
import { IAction } from '../IAction';
import * as ActionType from '../ActionTypes';
import { ListItem } from '../../models/ListItem';

const fetchingStarts = (id: Uuid): IAction => ({
  type: ActionType.FetchEditItemStarted,
  payload: {
    id
  }
});

const fetchingFailed = (id: Uuid): IAction => ({
  type: ActionType.FetchEditItemFailed,
  payload: {
    id
  }
});

export const fetchingSucceeded = (item: ListItem): IAction => ({
  type: ActionType.FetchEditItemSucceeded,
  payload: {
    ...item
  }
});


interface IRequestEditItemCreatorDependency {
  readonly fetchEditItem: (id: Uuid, text: string) => Promise<ListItem>;
}

export const requestEditItemCreator = (dependency: IRequestEditItemCreatorDependency) => (id: Uuid, text: string) =>
  async (dispatch: Dispatch): Promise<IAction> => {
    dispatch(fetchingStarts(id));

    try {
      const item = await dependency.fetchEditItem(id, text);

      return dispatch(fetchingSucceeded(item));
    } catch (error) {
      return dispatch(fetchingFailed(id));
    }
  };


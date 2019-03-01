import { requestAllItemsCreator } from './requestAllItems';

import { ListItem } from '../../models/ListItem';
import * as ActionType from '../ActionTypes';
import { IAction } from '../IAction';


const createItem = (id: Uuid, text: string, isActive: boolean = false, creationTime: string = '0005-12-17 20:30:00', lastUpdateTime: string = creationTime) =>
  new ListItem({
    id,
    text,
    isActive,
    creationTime,
    lastUpdateTime
  });

describe('requestAllItems', () => {
  it('dispatches fetchingStarts and after response was ok, dispatches fetchingSucceeded with items as its parameter', async () => {

    const items: ListItem[] = [
      createItem('3970a0db-c877-49e1-b4d0-75e931384289', 'item1'),
      createItem('b0e9856e-bb17-4c0b-b65f-f5a43e81617c', 'item2')
    ];


    const expected: IAction[] = [
      { type: ActionType.FetchItemsStarted, payload: {}},
      { type: ActionType.FetchItemsSucceeded, payload: { items } }
    ];

    const response = { json: () => Promise.resolve(items), ok: true };

    const fetchSuccess = () => Promise.resolve( response );

    const dispatch = jest.fn();

    await requestAllItemsCreator(fetchSuccess as any)(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(expected[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expected[1]);

  });
});

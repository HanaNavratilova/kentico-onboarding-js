import { requestAddItemCreator } from './requestAddItem';

import * as ActionType from '../ActionTypes';
import { IAction } from '../IAction';
import { ListItem } from '../../models/ListItem';

describe('requestAddItem', () => {
  it('dispatches fetchingStarts and after response was ok, dispatches fetchingSucceeded with item as its parameter', async () => {

    const createdItem = new ListItem({
      id: '3970a0db-c877-49e1-b4d0-75e931384289',
      text: 'newItemText',
      isActive: false,
      creationTime: '1574-12-17 20:30:00',
      lastUpdateTime: '1574-12-17 20:30:00'
    });

    const expected: IAction[] = [
      { type: ActionType.FetchAddItemStarted, payload: {} },
      { type: ActionType.FetchAddItemSucceeded, payload: { ...createdItem } }
    ];

    const response = { json: () => Promise.resolve(createdItem), ok: true };

    const fetch = () => Promise.resolve( response );

    const dispatch = jest.fn();

    await requestAddItemCreator(fetch as any)('newItemText')(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(expected[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expected[1]);

  });

  it('dispatches fetchingStarts and after response was not ok, dispatches fetchingFailed and throw an error', async () => {
    const expected: IAction[] = [
      { type: ActionType.FetchAddItemStarted, payload: {} },
      { type: ActionType.FetchAddItemFailed, payload: {} }
    ];

    const response = { ok: false };

    const fetch = () => Promise.resolve( response );

    const dispatch = jest.fn();

    let errorWasThrown = false;

    await requestAddItemCreator(fetch as any)('newItemText')(dispatch)
      .catch(_ => {errorWasThrown = true; });

    expect(errorWasThrown).toBeTruthy();
    expect(dispatch.mock.calls[0][0]).toEqual(expected[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expected[1]);

  });

  it('dispatches fetchingStarts and catch an error, dispatches fetchingFailed and throw an error', async () => {
    const expected: IAction[] = [
      { type: ActionType.FetchAddItemStarted, payload: {}},
      { type: ActionType.FetchAddItemFailed, payload: {} }
    ];

    const fetch = () => new Promise( () => { throw new Error(); });

    const dispatch = jest.fn();

    let errorWasThrown = false;

    await requestAddItemCreator(fetch as any)('newItemText')(dispatch)
      .catch(_ => {errorWasThrown = true; });

    expect(errorWasThrown).toBeTruthy();
    expect(dispatch.mock.calls[0][0]).toEqual(expected[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expected[1]);

  });
});

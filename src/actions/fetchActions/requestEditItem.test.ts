import { requestEditItemCreator } from './requestEditItem';

import { ListItem } from '../../models/ListItem';
import * as ActionType from '../ActionTypes';
import { IAction } from '../IAction';

describe('requestEditItem', () => {
  it('dispatches fetchingStarts and after response was ok, dispatches fetchingSucceeded with items as its parameter', async () => {

    const item = new ListItem({
      id: '3970a0db-c877-49e1-b4d0-75e931384289',
      text: 'editedText',
      isActive: false,
      creationTime: '1574-12-17 20:30:00',
      lastUpdateTime: '1574-12-17 20:30:00'
    });

    const expected: IAction[] = [
      { type: ActionType.FetchEditItemStarted, payload: {}},
      { type: ActionType.FetchEditItemSucceeded, payload: { ...item } }
    ];

    const response = { json: () => Promise.resolve(item), ok: true };

    const fetch = () => Promise.resolve( response );

    const dispatch = jest.fn();

    await requestEditItemCreator(fetch as any)('3970a0db-c877-49e1-b4d0-75e931384289', JSON.stringify({ text: 'editedText' }))(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(expected[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expected[1]);

  });

  it('dispatches fetchingStarts and after response was not ok, dispatches fetchingFailed and throw an error', async () => {
    const expected: IAction[] = [
      { type: ActionType.FetchEditItemStarted, payload: {}},
      { type: ActionType.FetchEditItemFailed, payload: {} }
    ];

    const response = { ok: false };

    const fetch = () => Promise.resolve( response );

    const dispatch = jest.fn();

    let errorWasThrown = false;

    await requestEditItemCreator(fetch as any)('3970a0db-c877-49e1-b4d0-75e931384289', JSON.stringify({ text: 'editedText' }))(dispatch)
      .catch(_ => {errorWasThrown = true; });

    expect(errorWasThrown).toBeTruthy();
    expect(dispatch.mock.calls[0][0]).toEqual(expected[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expected[1]);

  });

  it('dispatches fetchingStarts and catch an error, dispatches fetchingFailed and throw an error', async () => {
    const expected: IAction[] = [
      { type: ActionType.FetchEditItemStarted, payload: {}},
      { type: ActionType.FetchEditItemFailed, payload: {} }
    ];

    const fetch = () => new Promise( () => { throw new Error(); });

    const dispatch = jest.fn();

    let errorWasThrown = false;

    await requestEditItemCreator(fetch as any)('3970a0db-c877-49e1-b4d0-75e931384289', JSON.stringify({ text: 'editedText' }))(dispatch)
      .catch(_ => {errorWasThrown = true; });

    expect(errorWasThrown).toBeTruthy();
    expect(dispatch.mock.calls[0][0]).toEqual(expected[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expected[1]);

  });
});

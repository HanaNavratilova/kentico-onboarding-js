import { requestDeleteItemCreator } from './requestDeleteItem';

import * as ActionType from '../ActionTypes';
import { IAction } from '../IAction';

describe('requestDeleteItem', () => {
  it('dispatches fetchingStarts and after response was ok, dispatches fetchingSucceeded with id as its parameter', async () => {
    const id = '3970a0db-c877-49e1-b4d0-75e931384289';

    const expected: IAction[] = [
      { type: ActionType.FetchDeleteItemStarted, payload: {} },
      { type: ActionType.FetchDeleteItemSucceeded, payload: { id } }
    ];

    const response = { ok: true };

    const fetch = () => Promise.resolve( response );

    const dispatch = jest.fn();

    await requestDeleteItemCreator(fetch as any)(id)(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(expected[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expected[1]);

  });

  it('dispatches fetchingStarts and after response was not ok, dispatches fetchingFailed and throw an error', async () => {
    const id = '3970a0db-c877-49e1-b4d0-75e931384289';

    const expected: IAction[] = [
      { type: ActionType.FetchDeleteItemStarted, payload: {} },
      { type: ActionType.FetchDeleteItemFailed, payload: {} }
    ];

    const response = { ok: false };

    const fetch = () => Promise.resolve( response );

    const dispatch = jest.fn();

    let errorWasThrown = false;

    await requestDeleteItemCreator(fetch as any)(id)(dispatch)
      .catch(_ => {errorWasThrown = true; });

    expect(errorWasThrown).toBeTruthy();
    expect(dispatch.mock.calls[0][0]).toEqual(expected[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expected[1]);

  });

  it('dispatches fetchingStarts and catch an error, dispatches fetchingFailed and throw an error', async () => {
    const id = '3970a0db-c877-49e1-b4d0-75e931384289';

    const expected: IAction[] = [
      { type: ActionType.FetchDeleteItemStarted, payload: {}},
      { type: ActionType.FetchDeleteItemFailed, payload: {} }
    ];

    const fetch = () => new Promise( () => { throw new Error(); });

    const dispatch = jest.fn();

    let errorWasThrown = false;

    await requestDeleteItemCreator(fetch as any)(id)(dispatch)
      .catch(_ => {errorWasThrown = true; });

    expect(errorWasThrown).toBeTruthy();
    expect(dispatch.mock.calls[0][0]).toEqual(expected[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expected[1]);

  });
});

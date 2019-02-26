import * as fetch from 'isomorphic-fetch';
import { fetchingFailed, fetchingStarts, fetchingSucceeded } from './AppActions';
import { Dispatch } from 'redux';

export const fetchAllItems = () => (dispatch: Dispatch):  Promise<any> => {
    dispatch(fetchingStarts());

    return fetch('api/v1.0/List',  { method: 'GET' })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw new Error();
        })
      .then(items => dispatch((fetchingSucceeded(items))))
      .catch(_ => dispatch(fetchingFailed()));
};

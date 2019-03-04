import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import { app } from '../reducers/app';
import { createLogger } from 'redux-logger';
// import { getDefaultList } from './getDefaultList';
import { IAppState } from '../reducers/interfaces/IAppState';
import { IAction } from '../actions/IAction';
import thunk from 'redux-thunk';

const logger = createLogger({});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/*
const getPreloadedState = (): IAppState => ({
  list: {
    items: getDefaultList(),
    sorting: ListSorting.CreatedTime,
  },
  isInitialized: false
});*/

export const store = createStore<IAppState, IAction, any, never>(
  app,
  // getPreloadedState(),
  composeEnhancers(applyMiddleware(logger, thunk))
);

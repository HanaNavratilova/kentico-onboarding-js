import { combineReducers } from 'redux';

import { list } from './list/list';
import { IAppState } from './interfaces/IAppState';
import { isInitialized } from './isInitialized';

export const app = combineReducers<IAppState>({list, isInitialized});

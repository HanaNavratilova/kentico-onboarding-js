import { combineReducers } from 'redux';

import { list } from './list';
import { IAppState } from '../interfaces/IAppState';

export const app = combineReducers<IAppState>({list});

import { combineReducers } from 'redux';

import { items } from './items';
import { sorting } from './sorting';
import { IListState } from '../interfaces/IListState';
import { newItem } from './newItem';
import { listStatus } from './listStatus';

export const list = combineReducers<IListState>({items, sorting, newItem, listStatus });

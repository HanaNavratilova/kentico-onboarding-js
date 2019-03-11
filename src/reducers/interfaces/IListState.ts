import { ListItem } from '../../models/ListItem';
import { Map } from 'immutable';
import { ListSorting } from '../../constants/ListSorting';
import { ItemProperties } from './ItemProperties';
import { ListStatus } from './ListStatus';

export interface IListState {
  items: Map<Uuid, ListItem>;
  listStatus: ListStatus;
  sorting: ListSorting;
  newItem: ItemProperties;
}

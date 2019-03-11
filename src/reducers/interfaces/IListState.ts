import { ListItem } from '../../models/ListItem';
import { Map } from 'immutable';
import { ListSorting } from '../../constants/ListSorting';
import { ItemProperties } from './ItemProperties';

export interface IListState {
  items: Map<Uuid, ListItem>;
  isInitialized: boolean;
  sorting: ListSorting;
  newItem: ItemProperties;
}

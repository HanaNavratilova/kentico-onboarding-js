import { ItemStatus } from '../reducers/interfaces/ItemStatus';
import { TypedRecord } from './TypedRecord';

export interface IItemProperties {
  readonly status: ItemStatus;
  readonly newText: string;
  readonly errorMessage: string;
}

const emptyItemProperties: IItemProperties = {
  status: ItemStatus.NothingIsHappening,
  newText: '',
  errorMessage: ''
};

export class ItemProperties extends TypedRecord<ItemProperties, IItemProperties>(emptyItemProperties, 'ItemProperties') implements IItemProperties {
  readonly status: ItemStatus;
  readonly newText: string;
  readonly errorMessage: string;
}
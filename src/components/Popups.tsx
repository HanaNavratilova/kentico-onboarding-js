import * as React from 'react';
import {
  getItemStatusArray,
  ItemProperties,
  ItemStatus
} from '../reducers/interfaces/ItemProperties';
import { createErrorPopup } from '../utils/popups';
import * as PropTypes from 'prop-types';
import { getListStatusArray, ListStatus } from '../reducers/interfaces/ListStatus';

export interface IPopupsProps {
  readonly newItemStatus: ItemProperties;
  readonly listStatus: ListStatus;
}

export class Popups extends React.PureComponent<IPopupsProps> {
  static displayName = 'Popups';

  static propTypes = {
    newItemStatus: PropTypes.shape({
      status: PropTypes.oneOf(getItemStatusArray()).isRequired,
      errorMessage: PropTypes.string.isRequired,
      newText: PropTypes.string.isRequired
    }).isRequired,
    listStatus: PropTypes.oneOf(getListStatusArray()).isRequired
  };

  render(): null {
    if (this.props.newItemStatus.status === ItemStatus.SavingFailed) {
      createErrorPopup(this.props.newItemStatus.errorMessage);
    }

    if (this.props.listStatus === ListStatus.InitializationFailed) {
      createErrorPopup('Loading of all items failed!');
    }

    return null;
  }
}

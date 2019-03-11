import * as React from 'react';
import { getItemStatusArray, ItemStatus } from '../reducers/interfaces/ItemProperties';
import { createErrorPopup } from '../utils/popups';
import * as PropTypes from 'prop-types';
import { getListStatusArray, ListStatus } from '../reducers/interfaces/ListStatus';

export interface IPopupsProps {
  readonly newItemStatus: ItemStatus;
  readonly listStatus: ListStatus;
}

export class Popups extends React.PureComponent<IPopupsProps> {
  static displayName = 'Popups';

  static propTypes = {
    newItemStatus: PropTypes.oneOf(getItemStatusArray()).isRequired,
    listStatus: PropTypes.oneOf(getListStatusArray()).isRequired
  };

  render(): null {
    if (this.props.newItemStatus === ItemStatus.SavingFailed) {
      createErrorPopup('Adding failed!');
    }

    if (this.props.listStatus === ListStatus.InitializationFailed) {
      createErrorPopup('Loading of all items failed!');
    }

    return null;
  }
}

import * as React from 'react';
import { getItemStatusArray, ItemStatus } from '../reducers/interfaces/ItemProperties';
import { createErrorPopup } from '../utils/popups';
import * as PropTypes from 'prop-types';

export interface IPopupsProps {
  readonly newItemStatus: ItemStatus;
}

export class Popups extends React.PureComponent<IPopupsProps> {
  static displayName = 'Popups';

  static propTypes = {
    newItemStatus: PropTypes.oneOf(getItemStatusArray()).isRequired
  };

  render(): null {
    if (this.props.newItemStatus === ItemStatus.SavingFailed) {
      createErrorPopup('Adding failed!');
    }

    return null;
  }
}

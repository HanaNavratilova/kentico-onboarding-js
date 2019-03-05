import * as React from 'react';
import * as PropTypes from 'prop-types';

import { ListItem, IListItem } from '../models/ListItem';
import { isTextEmpty } from '../utils/isTextEmpty';
import { IAction } from '../actions/IAction';
import { createErrorPopup } from '../utils/popups';
import { SyncLoader } from 'react-spinners';

interface IActiveItemProps {
  readonly item: IListItem;
  readonly timeToRender: string;
  readonly onSaveItem: (text: string) => void;
  readonly onCancelItem: () => void;
  readonly onDeleteItem: () => Promise<IAction>;
}

interface IActiveItemState {
  readonly text: string;
  readonly isProcessingRequest: boolean;
  readonly deletionFailed: boolean;
}

export class ActiveItem extends React.PureComponent<IActiveItemProps, IActiveItemState> {
  static displayName = 'ActiveItem';

  static propTypes = {
    item: PropTypes.instanceOf(ListItem).isRequired,
    timeToRender: PropTypes.string.isRequired,
    onSaveItem: PropTypes.func.isRequired,
    onCancelItem: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
  };

  state = {
    text: this.props.item.text,
    isProcessingRequest: false,
    deletionFailed: false,
  };

  _saveInputValue = () => this.props.onSaveItem(this.state.text);

  _storeInputValue = (event: React.FormEvent<HTMLInputElement>) => {
    const text = event.currentTarget.value;
    this.setState(() => ({text}));
  };

  _deleteItem = () => {
    this.setState(() => ({isProcessingRequest: true}));
    this.props.onDeleteItem()
      .catch(() => {
        createErrorPopup('Couldn\'t delete item.');
        this.setState(() => ({isProcessingRequest: false, deletionFailed: true}));
      });
  };

  render(): JSX.Element {
    const textIsValid = isTextEmpty(this.state.text);
    const title = textIsValid ? undefined : 'You can\'t save an empty input :(';

    return (
      <div className="list-group-item list-group-item-action">
        <div className="row">
          <span className="col-sm-2 py-2 font-weight-bold">
            {
              this.props.timeToRender
            }
          </span>
          <div className="input-group col-md-8">
            <input
              className="form-control"
              type="text"
              value={this.state.text}
              onChange={this._storeInputValue}
              placeholder="You have to write something :)"
            />
            <div className="input-group-append">
              <button
                className="btn btn-info"
                type="submit"
                onClick={this._saveInputValue}
                disabled={!textIsValid || this.state.isProcessingRequest}
                title={title}
              >
                Save
              </button>
              <button
                className="btn btn-light border border-secondary"
                type="submit"
                onClick={this.props.onCancelItem}
                disabled={this.state.isProcessingRequest}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                type="submit"
                onClick={this._deleteItem}
                disabled={this.state.isProcessingRequest}
              >
                Delete
              </button>
            </div>
          </div>
          {this.state.isProcessingRequest &&
            <div className="pt-2">
              <SyncLoader color={'#17a2b8'} size={10}/>
            </div>
          }
          {this.state.deletionFailed &&
          <span className="py-1 pt-2 font-weight-bold text-danger">
            Deletion failed
          </span>
          }
        </div>
      </div>
    );
  }
}

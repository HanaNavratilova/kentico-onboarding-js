import * as React from 'react';
import * as PropTypes from 'prop-types';

import { ListItem, IListItem } from '../models/ListItem';
import { isTextEmpty } from '../utils/isTextEmpty';
import { IAction } from '../actions/IAction';
import { createErrorPopup } from '../utils/popups';
import { SyncLoader } from 'react-spinners';
import { color } from '../constants/color';

interface IActiveItemProps {
  readonly item: IListItem;
  readonly timeToRender: string;
  readonly onSaveItem: (text: string) => Promise<IAction>;
  readonly onCancelItem: () => void;
  readonly onDeleteItem: () => Promise<IAction>;
}

interface IActiveItemState {
  readonly text: string;
  readonly isProcessingRequest: boolean;
  readonly deletionFailed: boolean;
  readonly savingFailed: boolean;
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
    savingFailed: false,
  };

  _saveInputValue = () => {
    this.setState(() => ({isProcessingRequest: true, savingFailed: false, deletionFailed: false}));
    this.props.onSaveItem(this.state.text)
      .then(() => this.setState(() => ({isProcessingRequest: false, savingFailed: false})))
      .catch(() => {
        createErrorPopup('Couldn\'t save item.');
        this.setState(() => ({isProcessingRequest: false, savingFailed: true}));
      });
  };

  _storeInputValue = (event: React.FormEvent<HTMLInputElement>) => {
    const text = event.currentTarget.value;
    this.setState(() => ({text}));
  };

  _deleteItem = () => {
    this.setState(() => ({isProcessingRequest: true, deletionFailed: false, savingFailed: false}));
    this.props.onDeleteItem()
      .catch(() => {
        createErrorPopup('Couldn\'t delete item.');
        this.setState(() => ({isProcessingRequest: false, deletionFailed: true}));
      });
  };

  render(): JSX.Element {
    const textIsValid = isTextEmpty(this.state.text);
    const title = textIsValid ? undefined : 'You can\'t save an empty input :(';
    const errorMessage = this.state.deletionFailed
      ? 'Deletion failed.'
      : (
        this.state.savingFailed
          ? 'Saving failed.'
          : undefined
      );

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
                disabled={!textIsValid || this.state.isProcessingRequest || this.state.deletionFailed}
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
                disabled={this.state.isProcessingRequest || this.state.savingFailed}
              >
                Delete
              </button>
            </div>
          </div>
          {this.state.isProcessingRequest &&
            <div className="pt-2">
              <SyncLoader color={color} size={10}/>
            </div>
          }
          {(this.state.deletionFailed || this.state.savingFailed) &&
          <span className="py-1 pt-2 font-weight-bold text-danger">
            {errorMessage}
          </span>
          }
        </div>
      </div>
    );
  }
}

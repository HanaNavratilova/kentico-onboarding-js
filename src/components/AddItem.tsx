import * as React from 'react';
import * as PropTypes from 'prop-types';
import { isTextEmpty } from '../utils/isTextEmpty';
import { IAction } from '../actions/IAction';
import { createErrorPopup } from '../utils/popups';

export interface IAddItemDispatchProps {
  readonly onAddItem: (text: string) => Promise<IAction>;
}

export type IAddItemProps = IAddItemDispatchProps;

interface IAddItemState {
  readonly text: string;
  readonly addingFailed: boolean;
}

export class AddItem extends React.PureComponent<IAddItemProps, IAddItemState> {
  static displayName = 'AddItemInput';

  static propTypes = {
    onAddItem: PropTypes.func.isRequired,
  };

  state = {
    text: '',
    addingFailed: false
  };

  _addNewItem = () => {
    this.props.onAddItem(this.state.text)
      .then(() => this.setState(() => ({text: '', addingFailed: false})))
      .catch(() => {
        createErrorPopup('Adding failed!');
        this.setState(() => ({addingFailed: true}));
      });
  };

  _storeInputValue = (event: React.FormEvent<HTMLInputElement>) => {
    const text = event.currentTarget.value;
    this.setState(() => ({text}));
  };

  render(): JSX.Element {
    const isTextValid = isTextEmpty(this.state.text);
    const title = isTextValid ? undefined : 'You can\'t save an empty input :(';

    return (
      <li className="list-group-item d-flex">
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
                onClick={this._addNewItem}
                disabled={!isTextValid}
                data-toggle="tooltip"
                data-placement="top"
                title={title}
              >
                Add
              </button>
          </div>
        </div>
        {this.state.addingFailed &&
        <span className="py-1 pt-2 font-weight-bold text-danger">
          Adding failed, please try it again.
        </span>
        }
      </li>
    );
  }
}

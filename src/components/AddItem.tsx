import * as React from 'react';
import * as PropTypes from 'prop-types';
import { isTextEmpty } from '../utils/isTextEmpty';
import { SyncLoader } from 'react-spinners';
import { getItemStatusArray, ItemStatus } from '../reducers/interfaces/ItemProperties';

export interface IAddItemStateProps {
  readonly status: ItemStatus;
  readonly text: string;
}

export interface IAddItemDispatchProps {
  readonly onAddItem: (text: string) => void;
}

export type IAddItemProps = IAddItemStateProps & IAddItemDispatchProps;

interface IAddItemState {
  readonly text: string;
}

export class AddItem extends React.PureComponent<IAddItemProps, IAddItemState> {
  static displayName = 'AddItemInput';

  static propTypes = {
    status: PropTypes.oneOf(getItemStatusArray()).isRequired,
    onAddItem: PropTypes.func.isRequired,
  };

  state = {
    text: this.props.text,
  };

  componentDidUpdate(prevProps: Readonly<IAddItemProps>): void {
    if (prevProps.status === ItemStatus.BeingProcessed && this.props.status === ItemStatus.NothingIsHappening) {
      this.setState(() => ({
        text: ''
      }));
    }
  }

  _addNewItem = () => {
    this.props.onAddItem(this.state.text);
  };

  _storeInputValue = (event: React.FormEvent<HTMLInputElement>) => {
    const text = event.currentTarget.value;
    this.setState(() => ({text}));
  };

  render(): JSX.Element {
    const isTextValid = isTextEmpty(this.state.text);
    const title = isTextValid ? undefined : 'You can\'t save an empty input :(';

    const isProcessingRequest = this.props.status === ItemStatus.BeingProcessed;
    const addingFailed = this.props.status === ItemStatus.SavingFailed;

    return (
      <li className="list-group-item d-flex">
        <div className="input-group col-md-8">
          <input
            className="form-control"
            type="text"
            value={this.state.text}
            onChange={this._storeInputValue}
            disabled={isProcessingRequest}
            placeholder="You have to write something :)"
          />
          <div className="input-group-append">
            <button
              className="btn btn-info"
              type="submit"
              onClick={this._addNewItem}
              disabled={!isTextValid || isProcessingRequest}
              data-toggle="tooltip"
              data-placement="top"
              title={title}
            >
              Add
            </button>
          </div>
        </div>
        {isProcessingRequest &&
        <div className="pt-2">
          <SyncLoader
            color={'#17a2b8'}
            size={10}
          />
        </div>
        }
        {addingFailed &&
        <span className="py-1 pt-2 font-weight-bold text-danger">
          Adding failed, please try it again.
        </span>
        }
      </li>
    );
  }
}

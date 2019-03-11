import * as React from 'react';
import { ScaleLoader } from 'react-spinners';
import { FaUndo } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { color } from '../constants/color';
import * as PropTypes from 'prop-types';
import { getListStatusArray, ListStatus } from '../reducers/interfaces/ListStatus';

export interface ILoaderStateProps {
  readonly listStatus: ListStatus;
}

export interface ILoaderDispatchProps {
  readonly onLoaderDidMount: () => void;
}

interface ILoaderOwnProps {
  readonly children: JSX.Element;
}

type ILoaderProps = ILoaderStateProps & ILoaderDispatchProps & ILoaderOwnProps;

export class Loader extends React.PureComponent<ILoaderProps> {
  static displayName = 'Loader';

  static propTypes = {
    listStatus: PropTypes.oneOf(getListStatusArray()).isRequired,
    onLoaderDidMount: PropTypes.func.isRequired
  };

  _loadItems = () => {
    this.props.onLoaderDidMount();
  };

  componentDidMount(): void {
    this._loadItems();
  }

  _startLoadingItems = () => {
    this._loadItems();
  };

  render(): JSX.Element {
    const loadingFailed = this.props.listStatus === ListStatus.InitializationFailed;
    const isInitialized = this.props.listStatus === ListStatus.IsInitialized;
    const isBeingInitialized = this.props.listStatus === ListStatus.IsBeingInitialized;

    return (
      <div className="m-auto text-center">
        {loadingFailed &&
        <IconContext.Provider value={{color, size: '2em'}}>
          <FaUndo onClick={this._startLoadingItems} />
        </IconContext.Provider>
        }
        {isBeingInitialized &&
        <ScaleLoader color={color} />
        }
        {isInitialized &&
        this.props.children
        }
      </div>
    );
  }
}

import * as React from 'react';
import { ScaleLoader } from 'react-spinners';
import { IAction } from '../actions/IAction';
import { createErrorPopup } from '../utils/popups';
import { FaUndo } from 'react-icons/fa';
import { IconContext } from 'react-icons';

export interface ILoaderStateProps {
  readonly isInitialized: boolean;
}

export interface ILoaderDispatchProps {
  readonly onLoaderDidMount: () => Promise<IAction>;
}

interface ILoaderOwnProps {
  readonly children: JSX.Element;
}

type ILoaderProps = ILoaderStateProps & ILoaderDispatchProps & ILoaderOwnProps;

interface ILoaderState {
  readonly loadingFailed: boolean;
}

export class Loader extends React.PureComponent<ILoaderProps, ILoaderState> {
  state = {
    loadingFailed: false,
  };

  _loadItems = () => {
    this.props.onLoaderDidMount()
      .catch(_ => {
        createErrorPopup('Loading of all items failed!');
        this.setState((prevState) => ({loadingFailed: !prevState.loadingFailed}));
      });
  };

  componentDidMount(): void {
    this._loadItems();
  }

  _startLoadingItems = () => {
    this.setState((prevState) => ({loadingFailed: !prevState.loadingFailed}));
    this._loadItems();
  };

  render(): JSX.Element {
    const color = '#17a2b8';

    return (
      <div className="m-auto text-center">
        {this.state.loadingFailed
          ? (
            <IconContext.Provider value={{color, size: '2em'}}>
              <FaUndo onClick={this._startLoadingItems} />
            </IconContext.Provider>
          )
          : (this.props.isInitialized
              ? this.props.children
              : <ScaleLoader color={color} />
          )
        }
      </div>
    );
  }
}

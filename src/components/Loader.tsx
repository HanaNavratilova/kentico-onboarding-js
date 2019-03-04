import * as React from 'react';
import { ScaleLoader } from 'react-spinners';
import { IAction } from '../actions/IAction';
import { createErrorPopup } from '../utils/popups';

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


export class Loader extends React.PureComponent<ILoaderProps> {
  componentDidMount(): void {
    this.props.onLoaderDidMount()
      // .then()
      .catch(_ => createErrorPopup('Loading of all items failed!'));
  }

  render(): JSX.Element {
    return (
      <div>
            {this.props.isInitialized
              ? this.props.children
              : (
                <div className="m-auto text-center">
                  <ScaleLoader color={'#17a2b8'} />
                </div>
              )}
        </div>
    );
  }
}

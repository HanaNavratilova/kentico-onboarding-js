import * as React from 'react';
import { connect } from 'react-redux';

import { IAppState } from '../reducers/interfaces/IAppState';
import {
  Loader as LoaderComponent,
  ILoaderStateProps,
  ILoaderDispatchProps
} from '../components/Loader';
import { requestAllItems } from '../actions/fetchActions/requestAllItems';
import { ThunkDispatch } from 'redux-thunk';
import { IAction } from '../actions/IAction';

const mapStateToProps = ({ list }: IAppState): ILoaderStateProps => ({
  isInitialized: list.isInitialized
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, never, IAction>): ILoaderDispatchProps => ({
  onLoaderDidMount: () => dispatch(requestAllItems),
});

export const Loader: React.ComponentClass = connect(mapStateToProps, mapDispatchToProps)(LoaderComponent);


import * as React from 'react';
import { connect } from 'react-redux';

import { IAppState } from '../reducers/interfaces/IAppState';
import {
  Loader as LoaderComponent,
  ILoaderStateProps,
  ILoaderDispatchProps
} from '../components/Loader';
import { ThunkDispatch } from 'redux-thunk';
import { IAction } from '../actions/IAction';
import { requestAllItems } from '../actions/ListActions';

const mapStateToProps = ({ list }: IAppState): ILoaderStateProps => ({
  listStatus: list.listStatus
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, never, IAction>): ILoaderDispatchProps => ({
  onLoaderDidMount: () => dispatch(requestAllItems),
});

export const Loader: React.ComponentClass = connect(mapStateToProps, mapDispatchToProps)(LoaderComponent);


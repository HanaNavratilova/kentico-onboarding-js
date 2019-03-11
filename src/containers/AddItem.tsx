import * as React from 'react';
import { connect } from 'react-redux';

import {
  AddItem as AddItemComponent,
  IAddItemDispatchProps,
  IAddItemStateProps
} from '../components/AddItem';
import { ThunkDispatch } from 'redux-thunk';
import { requestAddItem } from '../actions/ListActions';
import { IAppState } from '../reducers/interfaces/IAppState';
import { IAction } from '../actions/IAction';

const mapStateToProps = ({list}: IAppState): IAddItemStateProps => ({
  status: list.newItem.status,
  text: list.newItem.newText
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, never, IAction>): IAddItemDispatchProps => ({
  onAddItem: (text: string) => dispatch(requestAddItem(text)),
});

export const AddItem: React.ComponentClass = connect(mapStateToProps, mapDispatchToProps)(AddItemComponent);

import * as React from 'react';
import { connect } from 'react-redux';

import { AddItem as AddItemComponent, IAddItemDispatchProps } from '../components/AddItem';
import { ThunkDispatch } from 'redux-thunk';
import { requestAddItem } from '../actions/fetchActions/requestAddItem';
import { IAppState } from '../reducers/interfaces/IAppState';
import { IAction } from '../actions/IAction';

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, never, IAction>): IAddItemDispatchProps => ({
  onAddItem: (text: string) => dispatch(requestAddItem(text)),
});

export const AddItem: React.ComponentClass = connect(null, mapDispatchToProps)(AddItemComponent);

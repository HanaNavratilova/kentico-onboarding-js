import * as React from 'react';
import { connect } from 'react-redux';
import {
  Item as ItemComponent,
  IItemStateProps,
  IItemDispatchProps,
  IItemProps
} from '../components/Item';
import { toggleItem } from '../actions/ListActions';
import { IAppState } from '../reducers/interfaces/IAppState';
import { getTimeFrom } from '../utils/getTimeFrom';
import { ListSorting } from '../constants/ListSorting';
import { ThunkDispatch } from 'redux-thunk';
import { IAction } from '../actions/IAction';
import { requestSaveItem } from '../actions/fetchActions/requestEditItem';
import { requestDeleteItem } from '../actions/fetchActions/requestDeleteItem';

interface IItemContainerProps {
  id: Uuid;
  lastRenderTime: Time;
  onItemPropsChanged: () => void;
}

const mapStateToProps = ({list}: IAppState, {id, lastRenderTime}: IItemContainerProps): IItemStateProps => {
  const item = list.items.get(id);
  return {
    item,
    timeToRender: list.sorting === ListSorting.CreatedTime
      ? getTimeFrom(lastRenderTime, item.creationTime)
      : getTimeFrom(lastRenderTime, item.lastUpdateTime)
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, never, IAction>, {id}: IItemContainerProps): IItemDispatchProps => ({
  onSaveItem: (text: string) => dispatch(requestSaveItem(id, text)),
  onDeleteItem: () => dispatch(requestDeleteItem(id)),
  onToggleItem: () => dispatch(toggleItem(id)),
});

const mergeProps = (stateProps: IItemStateProps, dispatchProps: IItemDispatchProps, ownProps: IItemContainerProps): IItemProps => ({
  ...stateProps,
  ...dispatchProps,
  onItemPropsChanged: ownProps.onItemPropsChanged,
});

export const Item: React.ComponentClass<IItemContainerProps> = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ItemComponent);

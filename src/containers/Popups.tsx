import * as React from 'react';
import { connect } from 'react-redux';
import {
  Popups as PopupsComponent,
  IPopupsProps
} from '../components/Popups';
import { IAppState } from '../reducers/interfaces/IAppState';

const mapStateToProps = ({list}: IAppState): IPopupsProps => ({
  newItemStatus: list.newItem.status,
  listStatus: list.listStatus,
});

export const Popups: React.ComponentClass = connect(mapStateToProps)(PopupsComponent);

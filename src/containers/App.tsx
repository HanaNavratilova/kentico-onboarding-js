import * as React from 'react';
import { connect } from 'react-redux';

import { IAppState } from '../reducers/interfaces/IAppState';
import { App as AppComponent, IAppStateProps } from '../App';

const mapStateToProps = (state: IAppState): IAppStateProps => ({
  isInitialized: state.isInitialized
});

export const App: React.ComponentClass = connect(mapStateToProps)(AppComponent);


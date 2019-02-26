import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';


import { store } from './utils/store';
import { TimerProvider } from './components/Timer';
import { App } from './containers/App';

ReactDOM.render((
    <Provider store={store}>
      <TimerProvider>
        <App />
      </TimerProvider>
    </Provider>
  ),
  document.getElementById('app-root')
);

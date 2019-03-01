import './sticky-footer.css';
import * as React from 'react';
import { PeriodicTicker } from './components/PeriodicTicker';
import { ListWithTimer } from './components/ListWithTimer';
import { ScaleLoader } from 'react-spinners';
import { ToastContainer } from 'react-toastify';

export interface IAppStateProps {
  readonly isInitialized: boolean;
}

export class App extends React.PureComponent<IAppStateProps> {
  render(): JSX.Element {
    return (
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          draggable={false}
          pauseOnHover
        />
        <PeriodicTicker />
        <div className="container">
          <div className="header clearfix">
            <h3 className="text-muted">
              Kentico Academy
            </h3>
          </div>
          <section id="app-content">
            {this.props.isInitialized
              ? <ListWithTimer />
              : (
                <div className="m-auto text-center">
                  <ScaleLoader color={'#17a2b8'} />
                </div>
              )}
          </section>
        </div>
        <footer className="footer">
          <p>
            &copy; 2018 Kentico software, s.r.o
          </p>
        </footer>
      </div>
    );
  }
}

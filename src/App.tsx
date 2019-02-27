import './sticky-footer.css';
import * as React from 'react';
import { PeriodicTicker } from './components/PeriodicTicker';
import { ListWithTimer } from './components/ListWithTimer';
import { ScaleLoader } from 'react-spinners';

export interface IAppStateProps {
  readonly isInitialized: boolean;
}

export class App extends React.PureComponent<IAppStateProps> {
  render(): JSX.Element {
    return (
      <div>
        <PeriodicTicker />
        <div className="container">
          <div className="header clearfix">
            <h3 className="text-muted">
              Kentico Academy
            </h3>
          </div>
          <section id="app-content">
            {
              this.props.isInitialized && <ListWithTimer />
            }
            {
              !this.props.isInitialized &&
              <div className="m-auto text-center">
                <ScaleLoader color={'#17a2b8'} />
              </div>
            }
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

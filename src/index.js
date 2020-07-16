import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import App from './App';
import * as serviceWorker from './serviceWorker';

export const history = createBrowserHistory();

// eslint-disable-next-line no-undef
ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { asReduxStore, connectReduxDevtools } from 'mst-middlewares';
import DevTools from 'mobx-react-devtools';
import remotedev from 'remotedev';
import makeInspectable from 'mobx-devtools-mst';
import './styles/index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import store from './shared/store';
import getConfig from './app/config';

if (getConfig().isLocalEnv) {
    connectReduxDevtools(remotedev, store);
}

makeInspectable(store);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { connectReduxDevtools } from 'mst-middlewares';
import remotedev from 'remotedev';
import makeInspectable from 'mobx-devtools-mst';
import './styles/index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import store from './shared/store';
import getConfig from './app/config';
// import CRUDY from "./playground/crud"
// import { DisplayList } from "./playground/crud"
console.log("getConfig", getConfig().isLocalEnv);

if (getConfig().isLocalEnv) {
    connectReduxDevtools(remotedev, store);
}

makeInspectable(store);
// console.log("CRUDY", CRUDY("studentStore"));
// const Crudy = CRUDY(DisplayList, "studentStore");
ReactDOM.render(
    <Provider store={store}>
        <App ></App>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

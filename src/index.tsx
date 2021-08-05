import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import store from './Redux/redux-store';

let rerenderEntireTree = () => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App appState={store.getState()}
                     dispatch={store.dispatch.bind(store)}
                />
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    )
};

rerenderEntireTree();

store.subscribe(rerenderEntireTree)

reportWebVitals();
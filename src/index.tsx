import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import store from './Redux/State';

let rerenderEntireTree = () => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App appState={store.getState()}
                     addPost={store.addPost.bind(store)}
                     updateNewPostText={store.updateNewPostText.bind(store)}
                     addMessage={store.addMessage.bind(store)}
                     onChangeTextareaDialogs={store.onChangeTextareaDialogs.bind(store)}
                />
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    )
};

rerenderEntireTree();

store.subscribe(rerenderEntireTree)

reportWebVitals();
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {addPost, StateType, updateNewPostText} from './Redux/State'
import {BrowserRouter} from 'react-router-dom';

export let rerenderEntireTree = (state: StateType ) => {

    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App appState={state} addPost={addPost} updateNewPostText={updateNewPostText}/>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    )
};
reportWebVitals();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. L


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import state, {subscribe} from './Redux/State';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {addMessage, addPost, onChangeTextareaDialogs, StateType, updateNewPostText} from './Redux/State'


let rerenderEntireTree = () => {

    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App appState={state}
                     addPost={addPost}
                     updateNewPostText={updateNewPostText}
                     addMessage={addMessage}
                     onChangeTextareaDialogs={onChangeTextareaDialogs}
                />
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    )
};

rerenderEntireTree();

subscribe(rerenderEntireTree)

reportWebVitals();
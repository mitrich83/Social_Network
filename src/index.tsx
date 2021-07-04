import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


export type DialogItemType = {
    name: string,
    id: number
}
let dialogs:Array<DialogItemType> = [
    {id: 1, name: 'Dimych'},
    {id: 2, name: 'Andrey'},
    {id: 3, name: 'Artem'},
    {id: 4, name: 'Sveta'},
    {id: 5, name: 'Yulia'},
    {id: 6, name: 'Sasha'},
];

export type MessageItemType = {
    message: string
    id: number
}
let messages:Array<MessageItemType> = [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'How'},
    {id: 3, message: 'How are you'},
    {id: 4, message: 'yo'},
    {id: 5, message: 'yo'},
    {id: 6, message: 'yo'},
];


ReactDOM.render(
  <React.StrictMode>
    <App dialogs={dialogs} messages={messages}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

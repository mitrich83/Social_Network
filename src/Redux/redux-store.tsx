import React from 'react';
import {combineReducers, createStore} from 'redux';
import profilePageReducer from './profilePageReducer';
import dialogPageReducer from './dialogPageReducer';


const reducers = combineReducers({
    profilePage: profilePageReducer,
    dialogPage: dialogPageReducer
    }
)

const store = createStore(reducers )

export default store
import React from 'react';
import {combineReducers, createStore} from 'redux';
import profilePageReducer from './profilePageReducer';
import dialogPageReducer from './dialogPageReducer';

const rootReducer = combineReducers({
    profilePage: profilePageReducer,
    dialogPage: dialogPageReducer
    }
)

export type AppStateType = ReturnType<typeof rootReducer>

const store = createStore(rootReducer)

export default store
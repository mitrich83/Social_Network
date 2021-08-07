import React from 'react';
import {combineReducers, createStore} from 'redux';
import profilePageReducer from './profilePageReducer';
import dialogsPageReducer from './dialogsPageReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    usersPage: usersReducer
    }
)

export type AppStateType = ReturnType<typeof rootReducer>

const store = createStore(rootReducer)

export default store
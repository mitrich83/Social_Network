import React from 'react';
import {combineReducers, createStore} from 'redux';
import profileReducer from './profile-reducer';
import dialogsPageReducer from './dialogsPageReducer';
import usersReducer from './users-reducer';

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsPageReducer,
    usersPage: usersReducer
    }
)

export type AppStateType = ReturnType<typeof rootReducer>

const store = createStore(rootReducer)

export default store
import React from 'react';
import {combineReducers, createStore} from 'redux';
import profileReducer from './profile-reducer';
import dialogsPageReducer from './dialogsPageReducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsPageReducer,
    usersPage: usersReducer,
    auth: authReducer,
    }
)

export type AppStateType = ReturnType<typeof rootReducer>

const store = createStore(rootReducer)

export default store
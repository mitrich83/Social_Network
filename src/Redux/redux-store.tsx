import React from 'react';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import thunkMiddleware from 'redux-thunk'

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    }
)

export type AppStateType = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store
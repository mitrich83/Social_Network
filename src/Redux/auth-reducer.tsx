import React from 'react';
import {authAPI} from '../api/api';
import {Dispatch} from 'redux';
import {AppStateType} from './redux-store';
import {ThunkAction} from 'redux-thunk';


const SET_USERS_DATA = 'SET-USERS-DATA'

export type AuthType = {
    userId: null | string,
    email: null | string,
    login: null | string,
    isAuth: boolean
}

export type DataType = {
    data: {
        userId: null,
        email: null,
        login: null,
        isAuth: boolean,
    },
}

export type ActionCreatorTypes =
    ReturnType<typeof setAuthUserDataAC>


export const InitialState: AuthType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = InitialState, action: ActionCreatorTypes): AuthType => {
    switch (action.type) {
        case SET_USERS_DATA: {
            return {
                ...state,
                ...action.payload,
            }
        }
        default:
            return state
    }
}

export const setAuthUserDataAC = (userId: string, login: string, email: string, isAuth: boolean) => (
    {type: SET_USERS_DATA, payload: {userId, login, email, isAuth}}
)


// thunks

export type ThunkType = ThunkAction<void, AppStateType, unknown, ActionCreatorTypes>

export const getAuthUserData = () => (dispatch: Dispatch<ActionCreatorTypes>) => {
    return authAPI.me()
        .then((res) => {
            debugger
            if (res.data.resultCode === 0) {
                let {id, login, email} = res.data;
                dispatch(setAuthUserDataAC(id, login, email, true))
            }
        });
}

export const login = (email: string, password: string, rememberMe: boolean): ThunkType => (dispatch) =>
    authAPI.login(email, password, rememberMe)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(getAuthUserData())
            }
        });

export const logout = (): ThunkType => (dispatch) =>
    authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setAuthUserDataAC('', '', '', false))
            }
        });

export default authReducer
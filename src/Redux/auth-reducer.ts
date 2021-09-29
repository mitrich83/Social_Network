import React from 'react';
import {authAPI} from '../api/api';
import {Dispatch} from 'redux';
import {AppStateType} from './redux-store';
import {ThunkAction} from 'redux-thunk';


const SET_USERS_DATA = 'SET-USERS-DATA'
const SET_ERROR_DATA = 'SET-ERROR-DATA'

export type InitialStateType = {
    userId: null | string,
    email: null | string,
    login: null | string,
    isAuth: boolean,
    messageError: string
}

export type DataType = {
    data: {
        userId: null,
        email: null,
        login: null,
        isAuth: boolean,
    },
}

export type AuthACTypes =
    ReturnType<typeof setAuthUserDataAC>
    | ReturnType<typeof setMessagesLogin>


export const InitialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    messageError: ''
}

const authReducer = (state = InitialState, action: AuthACTypes): InitialStateType => {
    switch (action.type) {
        case SET_USERS_DATA: {
            return {
                ...state,
                ...action.payload,
            }
        }
        case SET_ERROR_DATA: {
            debugger
            return {
                ...state,
                messageError: action.messageError,
            }
        }
        default:
            return state
    }
}

export const setAuthUserDataAC = (userId: string, login: string, email: string, isAuth: boolean) => (
    {type: SET_USERS_DATA, payload: {userId, login, email, isAuth}} as const
)

export const setMessagesLogin = (messageError: string) => (
    {type: SET_ERROR_DATA,  messageError} as const
)


// thunks

export type ThunkType = ThunkAction<void, AppStateType, unknown, AuthACTypes>

export const getAuthUserData = () => (dispatch: Dispatch<AuthACTypes>) => {
    return authAPI.me()
        .then((res) => {
            if (res.data.resultCode === 0) {
                let {id, login, email} = res.data;
                dispatch(setAuthUserDataAC(id, login, email, true))
            }
        });
}

export const login = (email: string, password: string, rememberMe: boolean): ThunkType => (dispatch) =>
    authAPI.login(email, password, rememberMe)
        .then((res) => {
            debugger
            const messageError = res.data.messages[0]
            if (res.data.resultCode === 0) {
                debugger
                dispatch(getAuthUserData())
                dispatch(setMessagesLogin(''))
            } else if (res.data.resultCode === 1) {
                dispatch(setMessagesLogin(messageError))
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
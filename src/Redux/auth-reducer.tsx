import React from 'react';
import {authAPI} from '../api/api';
import {Dispatch} from 'redux';


const SET_USERS_DATA = 'SET-USERS-DATA'

export type AuthType = {
    userId: null | string,
    email: null | string,
    login: null | string,
    isAuth : boolean
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


const InitialState: AuthType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = InitialState, action: ActionCreatorTypes):AuthType => {
    switch (action.type) {
        case SET_USERS_DATA: {
            return {
                ...state,
                ...action.payload,
                isAuth: true,
            }
        }
        default:
            return state
    }
}

export const setAuthUserDataAC = (userId: string, login: string, email: string  , isAuth: boolean) => (
    {type: SET_USERS_DATA, payload: {userId, login, email, isAuth }}
)

export const getAuthUserData = () => (dispatch:Dispatch)=> {
    return authAPI.me()
        .then(response => {
            if(response.data.resultCode === 0){
                let {id, login, email } = response.data.data;
                dispatch(setAuthUserDataAC(id, login, email, true))
            }
        });
}

/*export const login = (email:string, password:string, rememberMe:boolean) => (dispatch:Dispatch)=> {
    return authAPI.login(email, password, rememberMe)
        .then(response => {
            if(response.data.resultCode === 0){
              dispatch(getAuthUserData())
            }
        });
}*/

/*
export const logout = () => (dispatch:Dispatch)=> {
    return authAPI.logout()
        .then(response => {
            if(response.data.resultCode === 0){
                dispatch(getAuthUserData(null, null, null, false))
            }
        });
}
*/

export default authReducer
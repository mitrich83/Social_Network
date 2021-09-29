import React from 'react';
import {authAPI} from '../api/api';
import {Dispatch} from 'redux';
import {AppStateType} from './redux-store';
import {ThunkAction} from 'redux-thunk';
import {AuthACTypes, getAuthUserData} from './auth-reducer';


const SET_INITIALIZED = 'SET-INITIALIZED'


export type InitialStateType = {
    initialized: boolean
}

export type InitializedSuccessACType = ReturnType<typeof initializedSuccessAC>
export type AppACTypes = InitializedSuccessACType



export const InitialState: InitialStateType = {
    initialized: false
}

const appReducer = (state = InitialState, action: AppACTypes): InitialStateType => {
    switch (action.type) {
        case SET_INITIALIZED: {
            return {
                ...state,
                initialized: true,
            }
        }

        default:
            return state
    }
}
// actions
export const initializedSuccessAC = () => (
    {type: SET_INITIALIZED} as const
)


// thunks

export type ThunkType = ThunkAction<void, AppStateType, unknown, AppACTypes & AuthACTypes>

export const initialiseAppTC = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(()=> {
        dispatch(initializedSuccessAC())
    })

}


export default appReducer
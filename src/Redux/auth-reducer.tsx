import React from 'react';


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
                ...action.data,
                isAuth: true,
            }
        }
        default:
            return state
    }
}

export const setAuthUserDataAC = (userId: string, login: string, email: string  ) => (
    {type: SET_USERS_DATA, data: {userId, login, email }}
)

export default authReducer
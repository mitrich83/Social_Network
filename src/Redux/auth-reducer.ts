import {authAPI} from '../api/api';
import {Dispatch} from 'redux';
import {AppStateType} from './redux-store';
import {ThunkAction} from 'redux-thunk';


const SET_USERS_DATA = 'AUTH/SET-USERS-DATA'
const SET_ERROR_DATA = 'AUTH/SET-ERROR-DATA'

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

export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string,
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
    {type: SET_ERROR_DATA, messageError} as const
)


// thunks
export type ThunkType = ThunkAction<void, AppStateType, unknown, AuthACTypes>

export const getAuthUserData = () => async (dispatch: Dispatch<AuthACTypes>) => {
    let res = await authAPI.me()
    if (res.data.resultCode === 0) {
        let {id, login, email} = res.data.data;
        dispatch(setAuthUserDataAC(id, login, email, true))
    }
}

export const login = (email: string | null, password: string | null, rememberMe: boolean):ThunkType =>
    async (dispatch) => {
    let res = await authAPI.login(email, password, rememberMe)
    if (res.resultCode === 0) {
        dispatch(getAuthUserData())
        dispatch(setMessagesLogin(''))
    } else if (res.resultCode === 1) {
        dispatch(setMessagesLogin(res.messages[0]))
    }

}
export const logout = (): ThunkType => async (dispatch) => {
    let res = await authAPI.logout()
    if (res.resultCode === 0) {
        dispatch(setAuthUserDataAC('', '', '', false))
        dispatch(setMessagesLogin(''))
    }
}

export default authReducer
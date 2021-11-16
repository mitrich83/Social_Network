import {v1} from 'uuid';
import {profileAPI, usersAPI} from '../api/api';
import {Dispatch} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {AppStateType} from './redux-store';


const ADD_POST = 'PROFILE/ADD-POST'
const SET_USER_PROFILE = 'PROFILE/SET-USER-PROFILE'
const SET_STATUS = 'PROFILE/SET-STATUS'
const DELETE_POST = 'PROFILE/DELETE-POST'
const SAVE_PHOTO = 'PROFILE/SAVE-PHOTO'

//types
export type PostType = {
    message: string,
    image?: string,
    id: string,
    likesCount: number,
}
export type ProfileDataType = {
    posts: Array<PostType>
    profile: ProfileType
    status: string
}
export type ProfileType = {
    userId: number
    aboutMe: string,
    contacts: ContactsType,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    photos: {
        large: string,
        small: string,
    }
}

export type ContactsType = {
    facebook: null | string,
    website: null | string,
    vk: null | string,
    twitter: null | string,
    instagram: null | string,
    github: null | string,
    mainLink: null | string,
}

export type ActionProfileTypes =
    ReturnType<typeof addPostActionCreator> |
    ReturnType<typeof setUserProfile> |
    ReturnType<typeof setStatus> |
    ReturnType<typeof deletePost> |
    ReturnType<typeof savePhotoSuccess>


const initialState: ProfileDataType = {
    posts: [
        {id: v1(), message: 'Hi', likesCount: 12},
        {id: v1(), message: 'How are you', likesCount: 10},
    ],
    profile: {
        photos: {
            large: '',
            small: ''
        },
        contacts: {
            facebook: '',
            website: '',
            vk: '',
            twitter: '',
            instagram: '',
            github: '',
            mainLink: '',
        }
    } as ProfileType,
    status: '',
}
// reducer
const profileReducer = (state: ProfileDataType = initialState, action: ActionProfileTypes): ProfileDataType => {
    switch (action.type) {
        case ADD_POST:
            let text = action.newMessageTextarea.trim()
            if (text === '') return state
            const newPost: PostType = {
                id: v1(),
                message: text,
                likesCount: 0
            }
            return (
                {
                    ...state,
                    posts: [newPost, ...state.posts]
                }
            )
        case SET_USER_PROFILE: {
            return {
                ...state, profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state, status: action.status
            }
        }
        case DELETE_POST: {
            return {
                ...state, posts: state.posts.filter(p => p.message !== action.message)
            }
        }
        case SAVE_PHOTO: {
            return {
                ...state, profile: {...state.profile, photos: action.photos}
            }
        }
        default:
            return state
    }
}
// actions
export const addPostActionCreator = (newMessageTextarea: string) => ({type: ADD_POST, newMessageTextarea} as const)
export const setStatus = (status: string) => ({type: SET_STATUS, status} as const)
export const setUserProfile = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const)
export const deletePost = (message: string) => ({type: DELETE_POST, message} as const)
export const savePhotoSuccess = (photos: any) => ({type: SAVE_PHOTO, photos} as const)


// thunks
export const getUserProfile = (userId: string) =>
    async (dispatch: Dispatch<ActionProfileTypes>) => {
        const res = await usersAPI.getProfile(userId)
        dispatch(setUserProfile(res.data));
    }
export const getUserStatus = (userId: string) =>
    async (dispatch: Dispatch<ActionProfileTypes>) => {
        const res = await profileAPI.getStatus(userId)
        dispatch(setStatus(res.data));

    }
export const updateUserStatus = (status: string) =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionProfileTypes>,
           getState: () => AppStateType) => {
        const userId = getState().auth.userId
        const res = await profileAPI.updateStatus(status)
        if (res.data.resultCode === 0) {
            if (userId) {
                dispatch(getUserStatus(userId))
            }
        }
    }
export const savePhoto = (file: any) =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionProfileTypes>,
           getState: () => AppStateType) => {
        const userId = getState().auth.userId
        const res = await profileAPI.savePhoto(file)
        if (res.data.resultCode === 0) {
            if (userId) {
                dispatch(savePhotoSuccess(res.data.data.photos))
            }
        }
    }

export default profileReducer

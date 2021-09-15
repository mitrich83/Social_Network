import React from 'react';
import {v1} from 'uuid';
import {profileAPI, usersAPI} from '../api/api';
import {Dispatch} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {AppStateType} from './redux-store';


const ADD_POST = 'ADD-POST'
const CHANGE_NEW_POST_TEXT = 'CHANGE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'

export type PostType = {
    message: string
    image?: string
    id: string
    likesCount: number
}

export type ProfileDataType = {
    posts: Array<PostType>
    newPostText: string
    profile: ProfileType
    status: string
}

export type ProfileType = {
    userId: number
    aboutMe: string,
    contacts: {
        facebook: string,
        website:null,
        vk: string,
        twitter: string,
        instagram: string,
        youtube: string,
        github: string,
        mainLink: null
    },
    lookingForAJob: boolean,
    lookingForAJobDescription: string
    fullName: string
    photos: {
        large: string
        small: string
    }
}

export type ActionProfileTypes =
    ReturnType<typeof addPostActionCreator> |
    ReturnType<typeof changeNewPostActionCreator> |
    ReturnType<typeof setUserProfile> |
    ReturnType<typeof setStatus>

const initialState: ProfileDataType = {
    posts: [
        {id: v1(), message: 'Hi', likesCount: 12},
        {id: v1(), message: 'How are you', likesCount: 10},
    ],
    newPostText: 'it-kamasutra',
    profile: {
        photos: {
            large: '',
            small: ''
        }
    } as ProfileType,
    status: '',
}

const profileReducer = (state: ProfileDataType = initialState, action: ActionProfileTypes): ProfileDataType => {
    switch (action.type) {
        case ADD_POST:
            let text = state.newPostText.trim()
            if (text === '') return state
            const newPost: PostType = {
                id: v1(),
                message: state.newPostText,
                likesCount: 0
            }
            return (
                {
                    ...state,
                    newPostText: '',
                    posts: [...state.posts, newPost]
                }
            )
        case CHANGE_NEW_POST_TEXT:
            return (
                {
                    ...state,
                    newPostText: action.newText
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
        default:
            return state
    }
}

export const addPostActionCreator = () => ({type: ADD_POST} as const)
export const changeNewPostActionCreator = (newText: string) =>
    ({type: CHANGE_NEW_POST_TEXT, newText: newText} as const)
export const setStatus = (status: string)=> ({type: SET_STATUS, status} as const)
export const setUserProfile = (profile: ProfileType)=> ({type:SET_USER_PROFILE, profile} as const)
export const getUserProfile = (userId:string) => (dispatch:Dispatch)=> {
    usersAPI.getProfile(userId)
        .then(response => {
            dispatch(setUserProfile(response.data));
        });
}
export const getUserStatus = (userId:string) => (dispatch:Dispatch)=> {
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setStatus(response.data));
        });
}
export const updateUserStatus = (status:string)=> (
    dispatch: ThunkDispatch<AppStateType, unknown, ActionProfileTypes>,
    getState: () => AppStateType
    ) => {
    const userId = getState().auth.userId
    profileAPI.updateStatus(status)
        .then(response => {
            if(response.data.resultCode === 0) {
                if(userId) {
                    dispatch(getUserStatus(userId))
                }
            }
        });
}

export default profileReducer
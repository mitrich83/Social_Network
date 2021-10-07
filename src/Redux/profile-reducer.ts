import React from 'react';
import {v1} from 'uuid';
import {profileAPI, usersAPI} from '../api/api';
import {Dispatch} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {AppStateType} from './redux-store';


const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'
const DELETE_POST = 'DELETE_POST'

//types
export type PostType = {
    message: string
    image?: string
    id: string
    likesCount: number
}
export type ProfileDataType = {
    posts: Array<PostType>
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
    ReturnType<typeof setUserProfile> |
    ReturnType<typeof setStatus> |
    ReturnType<typeof deletePost>

const initialState: ProfileDataType = {
    posts: [
        {id: v1(), message: 'Hi', likesCount: 12},
        {id: v1(), message: 'How are you', likesCount: 10},
    ],
    profile: {
        photos: {
            large: '',
            small: ''
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
        case 'DELETE_POST': {
            return {
                ...state, posts: state.posts.filter(p => p.message !== action.message)
            }
        }
        default:
            return state
    }
}
// actions
export const addPostActionCreator = (newMessageTextarea:string) => ({type: ADD_POST, newMessageTextarea} as const)
export const setStatus = (status: string)=> ({type: SET_STATUS, status} as const)
export const setUserProfile = (profile: ProfileType)=> ({type:SET_USER_PROFILE, profile} as const)
export const deletePost = (message: string)=> ({type:DELETE_POST, message} as const)


// thunks
export const getUserProfile = (userId:string) => (dispatch:Dispatch<ActionProfileTypes>)=> {
    usersAPI.getProfile(userId)
        .then(response => {
            dispatch(setUserProfile(response.data));
        });
}
export const getUserStatus = (userId:string) => (dispatch:Dispatch<ActionProfileTypes>)=> {
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
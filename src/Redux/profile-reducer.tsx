import React from 'react';
import {v1} from 'uuid';
import {usersAPI} from '../api/api';
import {Dispatch} from 'redux';


const ADD_POST = 'ADD-POST'
const CHANGE_NEW_POST_TEXT = 'CHANGE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET-USER-PROFILE'

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
    ReturnType<typeof setUserProfile>

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
    } as ProfileType
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
        case 'SET-USER-PROFILE': {
            return {
                ...state, profile: action.profile
            }
        }
        default:
            return state
    }
}

export const addPostActionCreator = () => ({type: 'ADD-POST'} as const)
export const changeNewPostActionCreator = (newText: string) =>
    ({type: 'CHANGE-NEW-POST-TEXT', newText: newText} as const)
export const setUserProfile = (profile: ProfileType)=> ({type:SET_USER_PROFILE, profile} as const)
export const getUserProfile = (userId:string) => (dispatch:Dispatch)=> {
    usersAPI.getProfile(userId)
        .then(response => {
            dispatch(setUserProfile(response.data));
        });
}


export default profileReducer
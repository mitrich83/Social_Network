import React from 'react';
import {ActionTypes, PostType, ProfileDataType} from './store';

const ADD_POST = 'ADD-POST'
const CHANGE_NEW_POST_TEXT = 'CHANGE-NEW-POST-TEXT'


const initialState = {
    posts: [
        {id: 1, message: 'Hi', likesCount: 12},
        {id: 2, message: 'How are you', likesCount: 10},
    ],
    newPostText: 'it-kamasutra'
}

const profilePageReducer = (state: ProfileDataType = initialState, action: ActionTypes):ProfileDataType => {
    switch (action.type) {
        case ADD_POST:
            let text = state.newPostText.trim()
            if (text === '') return state
            const newPost: PostType = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            }
            state.posts.push(newPost);
            state.newPostText = ''
            return state
        case CHANGE_NEW_POST_TEXT:
            state.newPostText = action.newText
            return state
        default:
            return state
    }
}

export const addPostActionCreator = () => ({type: 'ADD-POST'} as const)
export const changeNewPostActionCreator = (newText:string) =>
    ({type:'CHANGE-NEW-POST-TEXT', newText: newText} as const)

export default profilePageReducer
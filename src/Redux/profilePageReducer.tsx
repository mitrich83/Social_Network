import React from 'react';
import {v1} from 'uuid';


const ADD_POST = 'ADD-POST'
const CHANGE_NEW_POST_TEXT = 'CHANGE-NEW-POST-TEXT'

export type PostType = {
    message: string
    image?: string
    id: string
    likesCount: number
}

export type ProfileDataType = {
    posts: Array<PostType>
    newPostText: string
}

export type ActionProfileTypes =
    ReturnType<typeof addPostActionCreator> |
    ReturnType<typeof changeNewPostActionCreator>

const initialState: ProfileDataType = {
    posts: [
        {id: v1(), message: 'Hi', likesCount: 12},
        {id: v1(), message: 'How are you', likesCount: 10},
    ],
    newPostText: 'it-kamasutra'
}

const profilePageReducer = (state: ProfileDataType = initialState, action: ActionProfileTypes): ProfileDataType => {
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
        default:
            return state
    }
}

export const addPostActionCreator = () => ({type: 'ADD-POST'} as const)
export const changeNewPostActionCreator = (newText: string) =>
    ({type: 'CHANGE-NEW-POST-TEXT', newText: newText} as const)

export default profilePageReducer
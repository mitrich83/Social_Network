import React from 'react';
import {v1} from 'uuid';

const ADD_MESSAGE = 'ADD-MESSAGE'
const CHANGE_TEXTAREA_DIALOGS = 'CHANGE-TEXTAREA-DIALOGS'

export type DialogItemType = {
    name: string,
    id: string
}
export type MessageItemType = {
    message: string
    id: string
}

export type DialogsPageDataType = {
    dialogs: Array<DialogItemType>
    messages: Array<MessageItemType>
}

export type ActionDialogsTypes =
    ReturnType<typeof AddMessageActionCreator>

const initialState: DialogsPageDataType = {
    dialogs: [
        {id: v1(), name: 'Dimych'},
        {id: v1(), name: 'Andrey'},
        {id: v1(), name: 'Artem'},
        {id: v1(), name: 'Sveta'},
        {id: v1(), name: 'Yulia'},
        {id: v1(), name: 'Sasha'},
    ],
    messages: [
        {id: v1(), message: 'Hi'},
        {id: v1(), message: 'How'},
        {id: v1(), message: 'How are you'},
        {id: v1(), message: 'yo'},
        {id: v1(), message: 'yo'},
        {id: v1(), message: 'yo'},
    ],
}

const dialogsReducer = (state: DialogsPageDataType = initialState, action: ActionDialogsTypes): DialogsPageDataType => {

    switch (action.type) {
        case ADD_MESSAGE:
            const text = action.newMessageTextarea.trim()
            if (text === '') return state
            const newMessage: MessageItemType = {
                id: v1(),
                message: action.newMessageTextarea.trim()
            }
            return (
                {
                    ...state,
                    messages: [...state.messages, newMessage]
                }
            );
        default:
            return state
    }
}
export const AddMessageActionCreator = (newMessageTextarea:string) => ({type: 'ADD-MESSAGE', newMessageTextarea} as const)

export default dialogsReducer
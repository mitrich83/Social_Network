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
    newMessageTextarea: string
}

export type ActionDialogsTypes =
    ReturnType<typeof AddMessageActionCreator> |
    ReturnType<typeof changeTextareaDialogsActionCreator>

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
    newMessageTextarea: ''
}

const dialogsPageReducer = (state: DialogsPageDataType = initialState, action: ActionDialogsTypes): DialogsPageDataType => {

    switch (action.type) {
        case ADD_MESSAGE:
            const text = state.newMessageTextarea.trim()
            if (text === '') return state
            const newMessage: MessageItemType = {
                id: v1(),
                message: state.newMessageTextarea.trim()
            }
            return (
                {
                    ...state,
                    newMessageTextarea: '',
                    messages: [...state.messages, newMessage]
                }
            );
        case
        CHANGE_TEXTAREA_DIALOGS:
            return {
                ...state,
                newMessageTextarea: action.newTextarea
            }
        default:
            return state
    }
}
export const AddMessageActionCreator = () => ({type: 'ADD-MESSAGE'} as const)
export const changeTextareaDialogsActionCreator = (newTextarea: string) =>
    ({type: 'CHANGE-TEXTAREA-DIALOGS', newTextarea: newTextarea} as const)

export default dialogsPageReducer
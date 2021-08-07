import React from 'react';

const ADD_MESSAGE = 'ADD-MESSAGE'
const CHANGE_TEXTAREA_DIALOGS = 'CHANGE-TEXTAREA-DIALOGS'

export type DialogItemType = {
    name: string,
    id: number
}
export type MessageItemType = {
    message: string
    id: number
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
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Artem'},
        {id: 4, name: 'Sveta'},
        {id: 5, name: 'Yulia'},
        {id: 6, name: 'Sasha'},
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How'},
        {id: 3, message: 'How are you'},
        {id: 4, message: 'yo'},
        {id: 5, message: 'yo'},
        {id: 6, message: 'yo'},
    ],
    newMessageTextarea: ''
}

const dialogsPageReducer = (state: DialogsPageDataType = initialState, action: ActionDialogsTypes): DialogsPageDataType => {

    switch (action.type) {
        case ADD_MESSAGE:
            const text = state.newMessageTextarea.trim()
            if (text === '') return state
            const newMessage: MessageItemType = {
                id: 7,
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
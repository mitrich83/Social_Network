import React from 'react';
import {ActionTypes, DialogsPageDataType, MessageItemType} from './State';

const ADD_MESSAGE = 'ADD-MESSAGE'
const CHANGE_TEXTAREA_DIALOGS = 'CHANGE-TEXTAREA-DIALOGS'

const dialogPageReducer = (state: DialogsPageDataType, action: ActionTypes):DialogsPageDataType => {
    switch (action.type) {
        case ADD_MESSAGE:
            const text = state.newMessageTextarea.trim()
            if (text === '') return state
            const newMessage: MessageItemType = {
                id: 7,
                message: state.newMessageTextarea.trim()
            }
            state.messages.push(newMessage)
            state.newMessageTextarea = ''
            return state
        case CHANGE_TEXTAREA_DIALOGS:
            state.newMessageTextarea = action.newTextarea
            return state
        default:
            return state
    }
}
export const AddMessageActionCreator = ()=> ({type: 'ADD-MESSAGE'} as const)
export const changeTextareaDialogsActionCreator = (newTextarea: string) =>
    ({type: 'CHANGE-TEXTAREA-DIALOGS', newTextarea: newTextarea} as const)

export default dialogPageReducer
import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import MessageItem from './MessageItem/MessageItem';
import {ActionTypes, DialogsPageDataType} from '../Redux/store';
import {AddMessageActionCreator, changeTextareaDialogsActionCreator} from '../Redux/dialogPageReducer';


export type DialogsPagePropsType = DialogsPageDataType & {
    dispatch: (action: ActionTypes) => void
    newMessageTextarea: string
}

const Dialogs = (props: DialogsPagePropsType) => {

    let dialogsElements = props.dialogs.map(d => <DialogItem dialog={d}/>);

    let messagesElements = props.messages.map(m => <MessageItem message={m}/>);

    const onChangeTextareaDialogs = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newTextarea = e.currentTarget.value
        props.dispatch(changeTextareaDialogsActionCreator(newTextarea))

    }

    const addMessage = () => {
        props.dispatch(AddMessageActionCreator())
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            addMessage()
        }
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <div>
                    <div>
                    <textarea
                        placeholder={'Enter your message'}
                        value={props.newMessageTextarea}
                        onChange={onChangeTextareaDialogs}
                        onKeyPress={onKeyPressHandler}
                    />
                    </div>
                    <div>
                        <button onClick={addMessage}>Add message</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;

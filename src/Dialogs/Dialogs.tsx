import React, {ChangeEvent, KeyboardEvent, KeyboardEventHandler} from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import MessageItem from './MessageItem/MessageItem';
import {DialogsPageDataType} from '../Redux/State';

export type DialogsPagePropsType = DialogsPageDataType & {
    addMessage: () => void
    newMessageTextarea: string
    onChangeTextareaDialogs: (newTextarea: string) => void
}

const Dialogs = (props: DialogsPagePropsType) => {


    let dialogsElements = props.dialogs.map(d => <DialogItem dialog={d}/>);

    let messagesElements = props.messages.map(m => <MessageItem message={m}/>);

    const onChangeTextareaDialogs = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.onChangeTextareaDialogs(e.currentTarget.value)
    }

    const addMessage = () => {
        props.addMessage()
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
                    <textarea onChange={onChangeTextareaDialogs}
                              value={props.newMessageTextarea}
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

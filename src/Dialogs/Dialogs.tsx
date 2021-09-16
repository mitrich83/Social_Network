import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import MessageItem from './MessageItem/MessageItem';
import {DialogForm} from './DialogForm';
import {DialogsPageDataType} from '../Redux/dialogs-reducer';

export type DialogsPagePropsType = {
    addMessage: (newMessageTextarea:string) => void
    dialogsPage: DialogsPageDataType
    isAuth: boolean
}

const Dialogs = (props: DialogsPagePropsType) => {
    let dialogsElements = props.dialogsPage.dialogs.map(
        d => <DialogItem key={d.id} dialog={d}
        />
    );

    let messagesElements = props.dialogsPage.messages.map(
        m => <MessageItem key={m.id} message={m}
        />
    );

    const addMessage = (newMessageTextarea:string) => {
        props.addMessage(newMessageTextarea)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <DialogForm addMessage={addMessage}

                />
            </div>
        </div>
    )
}

export default Dialogs;

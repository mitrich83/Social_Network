import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import MessageItem from './MessageItem/MessageItem';
import {DialogsPagePropsType} from '../Redux/State';

const Dialogs = (props: DialogsPagePropsType) => {


    let dialogsElements = props.dialogs.map(d => <DialogItem dialog={d}/>);

    let messagesElements = props.messages.map(m => <MessageItem message={m}/>);


    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    )
}

export default Dialogs;

import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import MessageItem from './MessageItem/MessageItem';
import {DialogsPageDataType} from '../Redux/dialogsPageReducer';
import {Redirect} from 'react-router';

export type DialogsPagePropsType = {
    onChangeTextareaDialogs:(newTextarea:string)=> void
    addMessage:()=> void
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
   
    //if(!props.isAuth) return <Redirect to={'/login'}/>
    
        const onChangeTextareaDialogs = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newTextarea = e.currentTarget.value
        props.onChangeTextareaDialogs(newTextarea)
    }

    const addMessage = () => {
        props.addMessage()
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            props.addMessage()
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
                        value={props.dialogsPage.newMessageTextarea}
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

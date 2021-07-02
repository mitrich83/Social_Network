import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Dialogs.module.css';

type DialogItemType = {
    name: string,
    id: number
}

const DialogItem = (props: DialogItemType) => {
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={'/dialogs/' + props.id}> {props.name}</NavLink>
        </div>
    )
}

type MessageItemType = {
    message: string
}

const MessageItem = (props: MessageItemType) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

const Dialogs = () => {

let dialogData =[
    {id: 1, name: 'Dimych'},
    {id: 2, name: 'Andrey'},
    {id: 3, name: 'Artem'},
    {id: 4, name: 'Sveta'},
    {id: 5, name: 'Yulia'},
    {id: 6, name: 'Sasha'},
]

    let messagesData = [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How'},
        {id: 3, message: 'How are you'},
        {id: 4, message: 'yo'},
        {id: 5, message: 'yo'},
        {id: 6, message: 'yo'},
    ]

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                <DialogItem name={dialogData[0].name} id={dialogData[0].id}/>
                <DialogItem name={dialogData[1].name} id={dialogData[1].id}/>
                <DialogItem name={dialogData[2].name} id={dialogData[2].id}/>
                <DialogItem name={dialogData[3].name} id={dialogData[3].id}/>
                <DialogItem name={dialogData[4].name} id={dialogData[4].id}/>
                <DialogItem name={dialogData[5].name} id={dialogData[5].id}/>
            </div>
            <div className={s.messages}>
                <MessageItem message={messagesData[0].message}/>
                <MessageItem message={messagesData[1].message}/>
                <MessageItem message={messagesData[2].message}/>
                <MessageItem message={messagesData[3].message}/>
                <MessageItem message={messagesData[4].message}/>
                <MessageItem message={messagesData[5].message}/>
            </div>
        </div>
    )
}

export default Dialogs;

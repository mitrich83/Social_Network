import React from 'react';
import s from './MessageItem.module.css';
import {MessageItemType} from '../../Redux/store';


type MessageItemPropsType ={
    message: MessageItemType
}


const MessageItem = (props: MessageItemPropsType) => {
    return (
        <div className={s.message}>{props.message.message}</div>
    )
}

export default MessageItem;

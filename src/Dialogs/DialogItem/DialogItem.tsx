import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './DialogItem.module.css';
import {DialogItemType} from '../../Redux/dialogsPageReducer';


type DialogItemPropsType ={
    dialog: DialogItemType
}

const DialogItem = (props: DialogItemPropsType) => {
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={'/dialogs/' + props.dialog.id}> {props.dialog.name}</NavLink>
        </div>
    )

}

export default DialogItem;

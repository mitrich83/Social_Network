import React from 'react';
import {
    AddMessageActionCreator,
    changeTextareaDialogsActionCreator,
    DialogsPageDataType
} from '../Redux/dialogsPageReducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {AppStateType} from '../Redux/redux-store';

type mapStateToPropsType = {
    dialogsPage: DialogsPageDataType
}

type mapDispatchToPropsType = {
    addMessage: () => void
    onChangeTextareaDialogs: (newTextarea: string) => void
}

const mapStateToProps =(state: mapStateToPropsType): mapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

const mapDispatchToProps =(dispatch: Dispatch): mapDispatchToPropsType=> {
    return {
        addMessage: ()=> {
            dispatch(AddMessageActionCreator());
        },
        onChangeTextareaDialogs: (newTextarea:string)=> {
            dispatch(changeTextareaDialogsActionCreator(newTextarea))
        }
    }
}

const DialogsContainer = connect<mapStateToPropsType, mapDispatchToPropsType, {}, AppStateType>(
    mapStateToProps, mapDispatchToProps
)(Dialogs)

export default DialogsContainer;


import React from 'react';
import {
    AddMessageActionCreator,
    changeTextareaDialogsActionCreator,
    DialogsPageDataType
} from '../Redux/dialogsPageReducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {compose, Dispatch} from 'redux';
import {AppStateType} from '../Redux/redux-store';
import {withAuthRedirect} from '../hoc/withAuthRedirect';


type mapStateToPropsType = {
    dialogsPage: DialogsPageDataType,
}

type mapDispatchToPropsType = {
    addMessage: () => void
    onChangeTextareaDialogs: (newTextarea: string) => void
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        addMessage: () => {
            dispatch(AddMessageActionCreator());
        },
        onChangeTextareaDialogs: (newTextarea: string) => {
            dispatch(changeTextareaDialogsActionCreator(newTextarea))
        }
    }
}

export default compose<React.ComponentType>(
    connect<mapStateToPropsType, mapDispatchToPropsType, {}, AppStateType>(
        mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
)(Dialogs)




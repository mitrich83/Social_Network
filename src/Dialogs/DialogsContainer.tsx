import React from 'react';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {compose, Dispatch} from 'redux';
import {
    AddMessageActionCreator,
    DialogsPageDataType
} from '../Redux/dialogs-reducer';
import {AppStateType} from '../Redux/redux-store';
import {withAuthRedirect} from '../hoc/withAuthRedirect';


type mapStateToPropsType = {
    dialogsPage: DialogsPageDataType,
}

type mapDispatchToPropsType = {
    addMessage: (newMessageTextarea:string) => void
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        addMessage: (newMessageTextarea:string) => {
            dispatch(AddMessageActionCreator(newMessageTextarea));
        }
    }
}

export default compose<React.ComponentType>(
    connect<mapStateToPropsType, mapDispatchToPropsType, {}, AppStateType>(
        mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
)(Dialogs)




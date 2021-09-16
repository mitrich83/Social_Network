import React from 'react';
import {
    addPostActionCreator,
    ProfileDataType
} from '../../Redux/profile-reducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {AppStateType} from '../../Redux/redux-store';

type mapStateToPropsType = {
    profilePage:ProfileDataType
}

type mapDispatchToPropsType = {
    addPost: (newMessageTextarea:string) => void
}

const mapStateToProps = (state: mapStateToPropsType):mapStateToPropsType => {
    return {
        profilePage: state.profilePage
    }
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        addPost: (newMessageTextarea:string) => {
            dispatch(addPostActionCreator(newMessageTextarea))
        },
    }
}

const MyPostsContainer = connect<mapStateToPropsType, mapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;


import React from 'react';
import {
    addPostActionCreator,
    changeNewPostActionCreator, ProfileDataType
} from '../../Redux/profilePageReducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {AppStateType} from '../../Redux/redux-store';

type mapStateToPropsType = {
    profilePage:ProfileDataType
}

type mapDispatchToPropsType = {
    addPost: () => void
    onPostChange: (newText: string) => void
}

const mapStateToProps = (state: mapStateToPropsType):mapStateToPropsType => {
    return {
        profilePage:state.profilePage
    }
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        addPost: () => {
            dispatch(addPostActionCreator())
        },
        onPostChange: (newText: string) => {
            const action = changeNewPostActionCreator(newText)
            dispatch(action)
        }
    }
}

const MyPostsContainer = connect<mapStateToPropsType, mapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;


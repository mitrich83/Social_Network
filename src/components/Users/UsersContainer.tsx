import React from 'react';
import {connect} from 'react-redux';
import Users from './Users';
import {AppStateType} from '../../Redux/redux-store';
import {followAC, setUsersAC, unfollowAC, UsersDataType, UserType} from '../../Redux/usersReducer';
import {Dispatch} from 'redux';


type mapStateToPropsType = {
    usersPage: UsersDataType
}
type mapDispatchToPropsType = {
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setUsers: (users: UserType[]) => void
}

//const PropsType = mapStateToPropsType & mapDispatchToPropsType

const mapStateToProps = (state: mapStateToPropsType): mapStateToPropsType => {
    return {
        usersPage: state.usersPage
    }
}

const mapDispatchToProps = (dispatch: Dispatch):mapDispatchToPropsType => {
    return {
        follow: (userId: string) => {
            dispatch(followAC(userId));
        },
        unfollow: (userId: string) => {
            dispatch(unfollowAC(userId));
        },
        setUsers: (users: UserType[]) => {
            dispatch(setUsersAC(users));
        }
    }

}

const UsersContainer = connect<mapStateToPropsType, mapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer
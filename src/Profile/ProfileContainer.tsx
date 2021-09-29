import React from 'react';
import Profile from './Profile';
import {getUserStatus, getUserProfile, ProfileType, updateUserStatus} from '../Redux/profile-reducer';
import {AppStateType} from '../Redux/redux-store';
import {RouteComponentProps, withRouter} from 'react-router';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withAuthRedirect} from '../hoc/withAuthRedirect';

type MapStatePropsType = {
    profile: ProfileType
    status: string
    authorizedUserId: any
    isAuth: boolean
}

type MapDispatchToPropsType = {
    getUserProfile: (userId: string) => void
    getUserStatus: (userId: string) => void
    updateUserStatus: (status: string) => void
}

type OwnPropsType = MapStatePropsType & MapDispatchToPropsType

type PathParamsType = {
    userId: string
}

type CommonPropsType = RouteComponentProps<PathParamsType> & OwnPropsType

class ProfileContainer extends React.Component<CommonPropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId;
            if(!userId){
                // this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)
    }

    render() {
        return (
            <Profile {...this.props}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateUserStatus={this.props.updateUserStatus}
            />
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
        getUserProfile,
        getUserStatus,
        updateUserStatus
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
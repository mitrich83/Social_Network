import React from 'react';
import Profile from './Profile';
import {getUserProfile, ProfileType} from '../Redux/profile-reducer';
import {AppStateType} from '../Redux/redux-store';
import { RouteComponentProps, withRouter} from 'react-router';
import {connect} from 'react-redux';
import {withAuthRedirect} from '../hoc/withAuthRedirect';

type MapStatePropsType = {
    profile: ProfileType
}

type MapDispatchToPropsType = {
    getUserProfile: (userId:string) => void
}

type OwnPropsType = MapStatePropsType & MapDispatchToPropsType

type PathParamsType = {
    userId: string
}

type CommonPropsType = RouteComponentProps<PathParamsType> & OwnPropsType

class ProfileContainer extends React.Component<CommonPropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if(!userId){
            userId = '2';
        }
        this.props.getUserProfile(userId)
    }

    render() {
        return (
            <Profile profile={this.props.profile} />
        )
    }
}

const mapStateToProps = (state:AppStateType):MapStatePropsType => ({
    profile: state.profilePage.profile
})

const WithUrlDataContainerComponent = withRouter(ProfileContainer)

// const AuthRedirectComponent = withAuthRedirect(ProfileContainer)
// const WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)

export default withAuthRedirect(connect<MapStatePropsType, MapDispatchToPropsType, {}, AppStateType >(mapStateToProps,{getUserProfile})(WithUrlDataContainerComponent));
import React from 'react';
import Profile from './Profile';
import {getUserProfile, ProfileType} from '../Redux/profile-reducer';
import {AppStateType} from '../Redux/redux-store';
import {RouteComponentProps, withRouter} from 'react-router';
import {connect} from 'react-redux';

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

const mapStateToProps = (state:AppStateType) => ({
    profile: state.profilePage.profile
})

const WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect<MapStatePropsType, MapDispatchToPropsType, {}, AppStateType >(mapStateToProps,{getUserProfile})(WithUrlDataContainerComponent);
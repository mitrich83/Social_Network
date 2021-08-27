import React from 'react';
import Profile from './Profile';
import axios from 'axios';
import {ProfileType, setUserProfile} from '../Redux/profile-reducer';
import {AppStateType} from '../Redux/redux-store';
import {RouteComponentProps, withRouter} from 'react-router';
import {connect} from 'react-redux';

type MapStatePropsType = {
    profile: ProfileType
}

type MapDispatchToPropsType = {
    setUserProfile: (profile: ProfileType) => void
}

type OwnPropsType = MapStatePropsType & MapDispatchToPropsType

type PathParamsType = {
    userId: string
}

type CommonPropsType = RouteComponentProps<PathParamsType> & OwnPropsType

class ProfileContainer extends React.Component<CommonPropsType> {
    componentDidMount() {
        debugger
        let userId = this.props.match.params.userId
        if(!userId){
            userId = '2';
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/`+ userId)
            .then(response => {
                this.props.setUserProfile(response.data);
            });
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

export default connect<MapStatePropsType, MapDispatchToPropsType, {}, AppStateType >(mapStateToProps,{setUserProfile})(WithUrlDataContainerComponent);
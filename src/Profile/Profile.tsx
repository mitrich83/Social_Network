import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo';
import {ActionTypes, ProfileDataType} from '../Redux/store';

export type  ProfilePropsType = ProfileDataType & {
    dispatch: (action:ActionTypes) => void
    newPostText: string

};
const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts
                posts={props.posts}
                dispatch={props.dispatch}
                newPostText={props.newPostText}

            />
        </div>
    )
}

export default Profile;
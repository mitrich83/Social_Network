import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo';
import {ProfileDataType} from '../Redux/State';

export type ProfilePropsType = ProfileDataType & {
    addPost: (postMessage: string) => void
};
const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.posts} addPost={props.addPost} />
        </div>
    )
}

export default Profile;
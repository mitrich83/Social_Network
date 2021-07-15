import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo';
import {ProfileDataType} from '../Redux/State';

export type  ProfilePropsType = ProfileDataType & {
    addPost: () => void
    newPostText: string
    updateNewPostText: (newText: string) => void
};
const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts
                posts={props.posts}
                addPost={props.addPost}
                newPostText={props.newPostText}
                updateNewPostText={props.updateNewPostText}
            />
        </div>
    )
}

export default Profile;
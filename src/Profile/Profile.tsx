import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo';
import {PostType} from './MyPosts/Post/Post';

// declare Array data, which I will send to component MyPosts
// type Array data description in type PostType from component Post
let posts: Array<PostType> = [
    {id: 1, message: 'Hi', likesCount: 12},
    {id: 2, message: 'How are you', likesCount: 10},
]

const Profile = () => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={posts} />
        </div>
    )
}

export default Profile;
import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';

const Profile = () => {
    return (
        <div>

            <div>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYXfNm71DdRde5ETp-7H0q0ApnJwQAFBWK4w&usqp=CAU"
                    alt=""/>
            </div>
            <div>
                ava + description
            </div>
            <div>
                <MyPosts />
            </div>
        </div>
    )
}

export default Profile;
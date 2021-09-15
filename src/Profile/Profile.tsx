import React from 'react';
import s from './Profile.module.css'
import ProfileInfo from './ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {ProfileType} from '../Redux/profile-reducer';

type ProfilePropsType = {
    profile: ProfileType
    status: string
    updateUserStatus: (status:string)=> void
}

const Profile = (props:ProfilePropsType) => {
    return (
        <div>
            <img className={s.img} src="http://user-life.com/uploads/posts/2018-08/1535615328_kak-udalit-avatarku-postavit-foto-sdelat-zagruzit-dobavit-telegramm-skayp-vayber-vatsap-windows-10.gif" alt="my avatar"/>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateUserStatus={props.updateUserStatus}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;
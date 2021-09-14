import React from 'react';
import s from './ProfileInfo.module.css';
import {Preloader} from '../components/common/preloader/Preloader';
import {ProfileType} from '../Redux/profile-reducer';
import {ProfileStatus} from './ProfileStatus';

type ProfileInfoPropsType = {
    profile: ProfileType
    status: string
    updateUserStatus: (status:string)=> void
}
const ProfileInfo = (props: ProfileInfoPropsType) => {
    if(!props.profile){
        return <Preloader/>
    }
    return (
        <div>

            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                <ProfileStatus status={props.status}/>
                <div>{props.profile.fullName}</div>
                <div>{props.profile.aboutMe}</div>

            </div>
        </div>
    )
}

export default ProfileInfo;
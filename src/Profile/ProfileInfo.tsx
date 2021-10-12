import React from 'react';
import s from './ProfileInfo.module.css';
import {Preloader} from '../components/common/preloader/Preloader';
import {ProfileType} from '../Redux/profile-reducer';
import {ProfileStatus} from './ProfileStatus';
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks';

type ProfileInfoPropsType = {
    profile: ProfileType
    status: string
    updateUserStatus: (status: string) => void
}
const ProfileInfo = ({profile, status, updateUserStatus}: ProfileInfoPropsType) => {
    if (!profile) {
        return <Preloader/>
    }
    return (
        <div>

            <div className={s.descriptionBlock}>
                <img src={profile.photos.large}/>
                <ProfileStatus status={status}
                               updateUserStatus={updateUserStatus}
                />
                <ProfileStatusWithHooks status={status}
                                        updateUserStatus={updateUserStatus}
                />
                <div>{profile.fullName}</div>
                <div>{profile.aboutMe}</div>

            </div>
        </div>
    )
}

export default ProfileInfo;
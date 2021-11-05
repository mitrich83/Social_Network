import React, {ChangeEvent} from 'react';
import s from './ProfileInfo.module.css';
import {Preloader} from '../components/common/preloader/Preloader';
import {ProfileType} from '../Redux/profile-reducer';
import {ProfileStatus} from './ProfileStatus';
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks';
import userPhoto from '../components/Users/images/userPhoto.jpg'

type ProfileInfoPropsType = {
    isOwner: boolean
    profile: ProfileType
    status: string
    updateUserStatus: (status: string) => void
    savePhoto: (e: File)=> void
}
const ProfileInfo = ({isOwner, profile, status, updateUserStatus, savePhoto}: ProfileInfoPropsType) => {
    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e:ChangeEvent<HTMLInputElement>)=> {
        if(e.target.files && e.target.files.length) {
           savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img className={s.mainPhoto}
                     src={profile.photos.large || userPhoto}
                />
                {isOwner &&
            <input type={'file'} onChange={onMainPhotoSelected}/>}
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
import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css';
import {Preloader} from '../components/common/preloader/Preloader';
import {ProfileType} from '../Redux/profile-reducer';
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks';
import userPhoto from '../components/Users/images/userPhoto.jpg'
import {ProfileData} from './MyPosts/ProfileData/ProfileData';
import {ProfileDataForm} from './MyPosts/ProfileDataForm/ProfileDataForm';

type ProfileInfoPropsType = {
    isOwner: boolean
    profile: ProfileType
    status: string
    updateUserStatus: (status: string) => void
    savePhoto: (e: File) => void
    saveProfileData: (profile: ProfileType) => void
}
const ProfileInfo = ({
                         isOwner,
                         profile,
                         status,
                         updateUserStatus,
                         savePhoto,
                         saveProfileData
                     }: ProfileInfoPropsType) => {

    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
    const goToEditMode = () => {
        setEditMode(true)
    }


    return (
        <div>
            <div className={s.descriptionBlock}>
                <img className={s.mainPhoto}
                     src={profile.photos.large || userPhoto}
                />
                {isOwner &&
                <input type={'file'} onChange={onMainPhotoSelected}/>}
                {editMode
                    ? <ProfileDataForm
                        profile={profile}
                        saveProfileData={saveProfileData}
                        setEditMode={setEditMode}
                    />
                    : <ProfileData profile={profile}
                                   isOwner={isOwner}
                                   goToEditMode={goToEditMode}
                    />
                }
                <ProfileStatusWithHooks status={status}
                                        updateUserStatus={updateUserStatus}
                />
            </div>
        </div>
    )
}

export default ProfileInfo;
import React from 'react';
import s from '../../ProfileInfo.module.css';
import {ContactsInfo} from './ContactsInfo/ContactsInfo';
import {ProfileType} from '../../../Redux/profile-reducer';

type ProfileDataType = {
    profile: ProfileType
}

export const ProfileData = ({profile}: ProfileDataType) => {
    return <div>
        <div>
            <b>Full name:</b> {profile.fullName}
        </div>
        <div>
            <b>About me:</b> {profile.aboutMe}
        </div>
        <div>
            <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {profile.lookingForAJob &&
        <div>
            <b>My professional skills:</b> {profile.lookingForAJobDescription}
        </div>
        }
        <div>
            <b>Contacts:</b>
            {Object.entries(profile.contacts).map(([key, value], index) => {
                return <ContactsInfo
                    key={index}
                    contactTitle={key}
                    contactValue={value}
                />
            })}
        </div>
    </div>
}
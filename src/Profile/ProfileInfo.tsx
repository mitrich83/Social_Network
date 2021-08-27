import React from 'react';
import s from './ProfileInfo.module.css';
import {Preloader} from '../components/common/preloader/Preloader';
import {ProfileType} from '../Redux/profile-reducer';

type ProfileInfoPropsType = {
    profile: ProfileType
}
const ProfileInfo = (props: ProfileInfoPropsType) => {
    if(!props.profile){
        return <Preloader/>
    }
    return (
        <div>
            <div>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYXfNm71DdRde5ETp-7H0q0ApnJwQAFBWK4w&usqp=CAU"
                    alt=""/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                ava + description
            </div>

        </div>
    )
}

export default ProfileInfo;
import React from 'react';
import {ProfileType} from '../../../Redux/profile-reducer';
import {ContactsInfo} from '../ProfileData/ContactsInfo/ContactsInfo';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';

type ProfileDataType = {
    profile: ProfileType
    saveProfileData: (profile: ProfileType) => void
    setEditMode: (value: boolean) => void
}

export const ProfileDataForm = ({profile, saveProfileData, setEditMode}: ProfileDataType) => {
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: profile,
        validate: (values) => {
            const errors = {};
            return errors;
        },
        onSubmit: values => {
            debugger
            dispatch(saveProfileData(values))
            // formik.resetForm();
            setEditMode(false)
        },
    })
    return <form onSubmit={formik.handleSubmit}>

        <div>
            <button type="submit">Save</button>
        </div>
        <div>
            <b>FullName:</b> {profile.fullName}
        </div>
        <div>
            <input
                type="fullName"
                placeholder="FullName"
                {...formik.getFieldProps('fullName')}
            />
            {formik.touched.fullName && formik.errors.fullName &&
            <div style={{color: 'red'}}>{formik.errors.fullName}</div>}
        </div>
        <div>
            <b>About me:</b> {profile.aboutMe}
        </div>
        <div>
            <textarea
                placeholder="About me"
                {...formik.getFieldProps('aboutMe')}
            />
            {formik.touched.aboutMe && formik.errors.aboutMe &&
            <div style={{color: 'red'}}>{formik.errors.aboutMe}</div>}
        </div>
        <div>
            <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        <div>
            <input
                type="checkbox"
                checked={formik.values.lookingForAJob}
                {...formik.getFieldProps('lookingForAJob')}
            />
        </div>
        <div>
            <textarea
                placeholder="lookingForAJobDescription"
                {...formik.getFieldProps('lookingForAJobDescription')}
            />
            {formik.touched.lookingForAJobDescription && formik.errors.lookingForAJobDescription &&
            <div style={{color: 'red'}}>{formik.errors.lookingForAJobDescription}</div>}
        </div>
        <div>
            {profile.lookingForAJob &&
            <div>
                <b>My professional skills:</b> {profile.lookingForAJobDescription}
            </div>
            }
        </div>
        <div>
            <b>Contacts:</b>
            {Object.entries(profile.contacts).map(([key, value], index) => {
                return <div>
                    <b>{key}: </b>
                    <input
                        // type={value ? value : ''}
                        // placeholder={value}
                        {...formik.getFieldProps({value})}

                    />
                </div>
            })}
        </div>
    </form>
}
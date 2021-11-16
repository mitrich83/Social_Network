import React from 'react';
import s from './ContactsInfo.module.css'

type ContactsInfoType = {
    contactTitle: string
    contactValue: string | null
}

export const ContactsInfo = ({contactTitle, contactValue}: ContactsInfoType) => {
            return <div className={s.contacts}>
                <b>{contactTitle}: </b>{contactValue}
            </div>
}
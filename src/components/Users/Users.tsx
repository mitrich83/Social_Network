import React from 'react';
import {UsersDataType, UserType} from '../../Redux/usersReducer';
import s from './Users.module.css'

type UsersPropsType = {
    usersPage: UsersDataType,
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setUsers: (users: UserType[]) => void
}

export const Users = (props: UsersPropsType) => {

    return (
        <div>
            {
                props.usersPage.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img className={s.usersPhoto} src={u.photoUrl}/>
                        </div>
                         <div>
                             {u.followed
                                 ? <button onClick={() => {props.follow(u.id)}}>follow</button>
                                 : <button onClick={() => {props.unfollow(u.id)}}>unfollow</button>
                             }
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                         <span>
                            <div>{u.location.country}</div>
                            <div>{u.location.city}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    )
}

export default Users;
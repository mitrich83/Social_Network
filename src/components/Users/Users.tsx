import React from 'react';
import {UsersDataType, UserType} from '../../Redux/usersReducer';
import s from './Users.module.css'
import axios from 'axios';
import userPhoto from './images/userPhoto.jpg'

type UsersPropsType = {
    usersPage: UsersDataType,
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setUsers: (users: UserType[]) => void
}

export const Users = (props: UsersPropsType) => {
    const getUsers = ()=> {
        if (props.usersPage.users.length === 0) {
            axios
                .get('https://social-network.samuraijs.com/api/1.0/users')
                .then(response => {
                props.setUsers(response.data.items)
            })
        }
    }
    return (
        <div>
            <button onClick={getUsers}>Get users</button>
            {
                props.usersPage.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img className={s.usersPhoto}
                                 src={u.photos.small !== null ? u.photos.small : userPhoto}/>
                        </div>
                         <div>
                             {u.followed
                                 ? <button onClick={() => {
                                     props.unfollow(u.id)
                                 }}>Unfollow</button>

                                 : <button onClick={() => {
                                     props.follow(u.id)
                                 }}>Follow</button>
                             }
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                         <span>
                            <div>{'u.location.country'}</div>
                            <div>{'u.location.city'}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    )
}

export default Users;


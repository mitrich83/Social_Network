import React from 'react';
import {UserType} from '../../Redux/users-reducer';
import s from './Users.module.css'
import userPhoto from './images/userPhoto.jpg'
import {NavLink} from 'react-router-dom';

type UsersPropsType = {
    user: UserType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: Array<number>,
}

export const User = React.memo((
    {
        user,
        unfollow,
        follow,
        followingInProgress,
        ...props}:UsersPropsType) => {

    return (
          <div>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + user.id}>
                            <img className={s.usersPhoto}
                                 src={user.photos.small !== null
                                     ? user.photos.small
                                     : userPhoto}
                            />
                            </NavLink>
                        </div>
                         <div>
                             {user.followed
                                 ? <button
                                     disabled={followingInProgress.some(id => id === user.id)}
                                     onClick={() => {
                                         unfollow(user.id)
                                     }}>Unfollow</button>

                                 : <button
                                     disabled={followingInProgress.some(id => id === user.id)}
                                     onClick={() => {
                                         follow(user.id)
                                     }}>Follow</button>
                             }
                                 </div>
                                 </span>
                    <span>
                                 <span>
                                 <div>{user.name}</div>
                                 <div>{user.status}</div>
                                 </span>
                                 <span>
                                 <div>{'u.location.country'}</div>
                                 <div>{'u.location.city'}</div>
                                 </span>
                                 </span>
                </div>)
})



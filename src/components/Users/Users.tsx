import React from 'react';
import {UsersDataType} from '../../Redux/users-reducer';
import s from './Users.module.css'
import userPhoto from './images/userPhoto.jpg'
import {NavLink} from 'react-router-dom';

type UsersPropsType = {
    usersPage: UsersDataType,
    pageSize: number
    totalUsersCount: number
    currentPage: 1 | number
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
    followingInProgress: Array<number>,
}

export const Users = (props: UsersPropsType) => {
    const pagesCount = Math.ceil(props.usersPage.totalUsersCount / props.usersPage.pageSize);
    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            <div>
                {pages.map(p => {
                    return <span className={(props.usersPage.currentPage === p) ? s.selectedPage : ''}
                                 onClick={() => {
                                     props.onPageChanged(p)
                                 }}> {p}</span>
                })}
            </div>
            {
                props.usersPage.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                            <img className={s.usersPhoto}
                                 src={u.photos.small !== null
                                     ? u.photos.small
                                     : userPhoto}
                            />
                            </NavLink>
                        </div>
                         <div>
                             {u.followed
                                 ? <button
                                     disabled={props.usersPage.followingInProgress.some(id => id === u.id)}
                                     onClick={() => {
                                         props.unfollow(u.id)
                                     }}>Unfollow</button>

                                 : <button
                                     disabled={props.usersPage.followingInProgress.some(id => id === u.id)}
                                     onClick={() => {
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



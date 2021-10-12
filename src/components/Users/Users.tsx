import React from 'react';
import {UsersDataType} from '../../Redux/users-reducer';
import {Paginator} from '../common/Paginator/Paginator';
import {User} from './User';

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

export const Users = React.memo((
    {
        totalUsersCount,
        pageSize,
        usersPage,
        currentPage,
        onPageChanged,
        unfollow,
        follow,
        followingInProgress,
        ...props
    }: UsersPropsType) => {

    return (
        <div>
            <Paginator
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                pageSize={pageSize}
                totalUsersCount={totalUsersCount}
            />
            <div>
                {
                    usersPage.users.map(u => <User key={u.id}
                                                   user={u}
                                                   followingInProgress={followingInProgress}
                                                   follow={follow}
                                                   unfollow={unfollow}
                        />
                    )
                }
            </div>
        </div>
    )
})



import React from 'react';
import {v1} from 'uuid';

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'

export type UserType = {
    name: string,
    id: string,
    uniqueUrlName: null | string,
    photos: {
        small: null | string,
        large: null | string
    },
    status: null | string,
    followed: boolean
}

export type UsersDataType = {
    users: UserType[]
}

export type ActionCreatorTypes =
    ReturnType<typeof followAC> |
    ReturnType<typeof unfollowAC> |
    ReturnType<typeof setUsersAC>

const initialState: UsersDataType = {
    users: [],
}

const usersReducer = (state: UsersDataType = initialState, action: ActionCreatorTypes): UsersDataType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })

            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                        if (u.id === action.userId) {
                            return {...u, followed: false}
                        }
                        return u
                    }
                )
            }
        case SET_USERS:
            return {
                ...state, users: [...action.users]
            }
        default:
            return state
    }
}

export const followAC = (userId: string) => ({type: FOLLOW, userId} as const)
export const unfollowAC = (userId: string) => ({type: UNFOLLOW, userId} as const)
export const setUsersAC = (users: UserType[]) => ({type: SET_USERS, users} as const)

export default usersReducer
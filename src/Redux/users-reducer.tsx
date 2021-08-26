import React from 'react';
import {v1} from 'uuid';

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE ='SET-CURRENT-PAGE'
const SET_TOTAL_CURRENT_USERS_COUNT = 'SET-TOTAL-CURRENT-USERS-COUNT'

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
    users: UserType[],
    pageSize: number,
    totalUsersCount: number,
    currentPage: number
}

export type ActionCreatorTypes =
    ReturnType<typeof followAC> |
    ReturnType<typeof unfollowAC> |
    ReturnType<typeof setUsersAC> |
    ReturnType<typeof setCurrentPageAC> |
    ReturnType<typeof setTotalUsersCountAC>

const initialState: UsersDataType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage:1

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
            return {...state, users: action.users}

        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_CURRENT_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        default:
            return state
    }
}

export const followAC = (userId: string) => ({type: FOLLOW, userId} as const)
export const unfollowAC = (userId: string) => ({type: UNFOLLOW, userId} as const)
export const setUsersAC = (users: UserType[]) => ({type: SET_USERS, users} as const)
export const setCurrentPageAC = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const)
export const setTotalUsersCountAC = (totalUsersCount: number) => ({type: SET_TOTAL_CURRENT_USERS_COUNT, totalUsersCount} as const)

export default usersReducer
import React from 'react';
import {v1} from 'uuid';

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE ='SET-CURRENT-PAGE'
const SET_TOTAL_CURRENT_USERS_COUNT = 'SET-TOTAL-CURRENT-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'

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
    isFetching: boolean
}

export type ActionCreatorTypes =
    ReturnType<typeof follow> |
    ReturnType<typeof unfollow> |
    ReturnType<typeof setUsers> |
    ReturnType<typeof setCurrentPage> |
    ReturnType<typeof setTotalUsersCount> |
    ReturnType<typeof toggleFetching>

const initialState: UsersDataType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true

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
        case 'TOGGLE-IS-FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        default:
            return state
    }
}

export const follow = (userId: string) => ({type: FOLLOW, userId} as const)
export const unfollow = (userId: string) => ({type: UNFOLLOW, userId} as const)
export const setUsers = (users: UserType[]) => ({type: SET_USERS, users} as const)
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const)
export const setTotalUsersCount = (totalUsersCount: number) => ({type: SET_TOTAL_CURRENT_USERS_COUNT, totalUsersCount} as const)
export const toggleFetching = (isFetching: boolean)=> ({type: TOGGLE_IS_FETCHING, isFetching} as const)

export default usersReducer
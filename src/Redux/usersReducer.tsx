import React from 'react';
import {v1} from 'uuid';

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'

export type UserType = {
    id: string,
    photoUrl:string,
    followed: boolean,
    name:string,
    status: string,
    location: {
        city: string,
        country:string
    }
}

export type UsersDataType = {
    users: UserType[]
}

export type ActionCreatorTypes =
    ReturnType<typeof followAC> |
    ReturnType<typeof unfollowAC> |
    ReturnType<typeof setUsersAC>

const initialState:UsersDataType = {
    users: [
        {id: v1(), photoUrl: 'https://cdn.iz.ru/sites/default/files/styles/900x506/public/article-2020-12/_AMA4805_1.jpg?itok=dy1Eu-eB', followed: true, name: 'Dimych', status: 'Boss', location: {city: 'Minsk', country: 'Belarus'}},
        {id: v1(), photoUrl: 'https://cdn.iz.ru/sites/default/files/styles/900x506/public/article-2020-12/_AMA4805_1.jpg?itok=dy1Eu-eB', followed: true, name: 'Andrey', status: 'Boss', location: {city: 'Moscow', country: 'Russia'}},
        {id: v1(), photoUrl: 'https://cdn.iz.ru/sites/default/files/styles/900x506/public/article-2020-12/_AMA4805_1.jpg?itok=dy1Eu-eB', followed: false, name: 'Anton', status: 'Boss', location: {city: 'Grodno', country: 'Belarus'}},
        {id: v1(), photoUrl: 'https://cdn.iz.ru/sites/default/files/styles/900x506/public/article-2020-12/_AMA4805_1.jpg?itok=dy1Eu-eB', followed: false, name: 'Sergey', status: 'Boss', location: {city: 'Kiev', country: 'Ukraine'}},
        {id: v1(), photoUrl: 'https://cdn.iz.ru/sites/default/files/styles/900x506/public/article-2020-12/_AMA4805_1.jpg?itok=dy1Eu-eB', followed: true, name: 'Vladimir', status: 'Boss', location: {city: 'Rostov', country: 'Russia'}},
    ],
}

const usersReducer = (state:UsersDataType = initialState, action:ActionCreatorTypes):UsersDataType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.type) {
                        return {...u, followed: true}
                    }
                    return u
                })

            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                        if (u.id === action.type) {
                            return {...u, followed: false}
                        }
                        return u
                    }
                )
            }
        case SET_USERS:
            return {
                ...state, users: [...state.users]
            }
        default:
            return state
    }
}

export const followAC = (userId:string) => ({type: FOLLOW, userId})
export const unfollowAC = (userId:string) => ({type: UNFOLLOW, userId})
export const setUsersAC = (users:UserType[]) => ({type: SET_USERS, users})

export default usersReducer
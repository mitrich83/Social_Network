import {UnfollowFollowResponseType, usersAPI} from '../api/api';
import {Dispatch} from 'redux';


const FOLLOW = 'USERS/FOLLOW'
const UNFOLLOW = 'USERS/UNFOLLOW'
const SET_USERS = 'USERS/SET_USERS'
const SET_CURRENT_PAGE = 'USERS/SET-CURRENT-PAGE'
const SET_TOTAL_CURRENT_USERS_COUNT = 'USERS/SET-TOTAL-CURRENT-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'USERS/TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'USERS/TOGGLE-IS-FOLLOWING-PROGRESS'


const initialState: UsersDataType = {
    users: [],
    pageSize: 20,
    portionSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>,
}

const usersReducer = (state: UsersDataType = initialState, action: ActionCreatorTypes): UsersDataType => {
    switch (action.type) {
        case FOLLOW:

            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)
            }
        case SET_USERS:
        case SET_CURRENT_PAGE:
        case SET_TOTAL_CURRENT_USERS_COUNT:
        case TOGGLE_IS_FETCHING:
            return {...state, ...action.payload}

        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}

// actions
export const followSuccess = (userId: number) => ({type: FOLLOW, userId} as const)
export const unfollowSuccess = (userId: number) => ({type: UNFOLLOW, userId} as const)
export const setUsers = (users: UserType[]) => ({type: SET_USERS, payload:{users}} as const)
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, payload:{currentPage}} as const)
export const setTotalUsersCount = (totalUsersCount: number) => ({
    type: SET_TOTAL_CURRENT_USERS_COUNT,
    payload:{totalUsersCount}
} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, payload:{isFetching}} as const)
export const toggleIsFollowingProgress = (isFetching: boolean, userId: number) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
} as const)

// thunks
export const requestUsers = (currentPage: number, pageSize: number) => {
    return async (dispatch: Dispatch<ActionCreatorTypes>) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(currentPage))
        const data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

const followUnfollow = async (dispatch: Dispatch<ActionCreatorTypes>,
                              userId: number,
                              apiMethod: (userId: number) => Promise<any>,
                              actionCreator: (userId: number) => ActionCreatorTypes) => {
    dispatch(toggleIsFollowingProgress(true, userId))
    const res = await apiMethod(userId)
    if (res.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleIsFollowingProgress(false, userId))
}

export const follow = (userId: number) => async (dispatch: Dispatch<ActionCreatorTypes>) => {
        let apiMethod = await usersAPI.follow.bind(usersAPI)
        followUnfollow(dispatch, userId, apiMethod, followSuccess)
    }

export const unfollow = (userId: number) => {
    return async (dispatch: Dispatch<ActionCreatorTypes>) => {
        let apiMethod = await usersAPI.unfollow.bind(usersAPI)
        followUnfollow(dispatch, userId, apiMethod, unfollowSuccess)
    }
}

export default usersReducer

// types
export type UserType = {
    name: string,
    id: number,
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
    portionSize: number
    totalUsersCount: number,
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}

type FollowSuccessType = ReturnType<typeof followSuccess>
type UnfollowSuccessType = ReturnType<typeof unfollowSuccess>
type SetUsersType = ReturnType<typeof setUsers>
type SetCurrentPageType = ReturnType<typeof setCurrentPage>
type SetTotalUsersCountType = ReturnType<typeof setTotalUsersCount>
type ToggleIsFetchingType = ReturnType<typeof toggleIsFetching>
type ToggleIsFollowingProgressType = ReturnType<typeof toggleIsFollowingProgress>

export type ActionCreatorTypes =
    FollowSuccessType |
    UnfollowSuccessType |
    SetUsersType |
    SetCurrentPageType |
    SetTotalUsersCountType |
    ToggleIsFetchingType|
    ToggleIsFollowingProgressType
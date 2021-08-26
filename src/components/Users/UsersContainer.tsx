import React from 'react';
import {connect} from 'react-redux';
import {AppStateType} from '../../Redux/redux-store';
import {
    followAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC,
    unfollowAC,
    UsersDataType,
    UserType
} from '../../Redux/users-reducer';
import {Dispatch} from 'redux';
import axios from 'axios';
import {Users} from './Users';

type UsersPropsType = {
    usersPage: UsersDataType,
    pageSize: number
    totalUsersCount: number
    currentPage: 1 | number
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setUsers: (users: UserType[]) => void
    setTotalUsersCount: (users: UserType[]) => void
    setCurrentPage: (pageNumber: number) => void
}

type mapStateToPropsType = {
    usersPage: UsersDataType,
    pageSize: number,
    totalUsersCount: number,
    currentPage:  number
}
type mapDispatchToPropsType = {
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setUsers: (users: UserType[]) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
}

class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
            });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);

        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {

        return <Users
            totalUsersCount = {this.props.totalUsersCount}
            pageSize ={this.props.pageSize}
            usersPage = {this.props.usersPage}
            currentPage = {this.props.currentPage}
            onPageChanged= {this.onPageChanged}
            follow={this.props.follow}
            unfollow={this.props.unfollow}

        />
    }
}

const mapStateToProps = (state: mapStateToPropsType): mapStateToPropsType => {
    return {
        usersPage: state.usersPage,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
}

const mapDispatchToProps = (dispatch: Dispatch):mapDispatchToPropsType => {
    return {
        follow: (userId: string) => {
            dispatch(followAC(userId));
        },
        unfollow: (userId: string) => {
            dispatch(unfollowAC(userId));
        },
        setUsers: (users: UserType[]) => {
            dispatch(setUsersAC(users));
        },
        setCurrentPage: (pageNumber: number) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersCount: (totalUsersCount: number) => {
            dispatch(setTotalUsersCountAC(totalUsersCount))
        }
    }

}



// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)

// <mapStateToPropsType, mapDispatchToPropsType, {}, AppStateType>


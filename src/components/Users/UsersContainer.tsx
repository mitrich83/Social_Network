import React from 'react';
import {connect} from 'react-redux';
import {AppStateType} from '../../Redux/redux-store';
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers, toggleFetching,
    unfollow,
    UsersDataType,
    UserType
} from '../../Redux/users-reducer';
import {Dispatch} from 'redux';
import axios from 'axios';
import {Users} from './Users';
import {Preloader} from '../common/preloader/Preloader';
import preloader from '../common/preloader/Fidget-spinner.gif';

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
    toggleFetching: (isFetching: boolean) => void
    isFetching: boolean
}

type mapStateToPropsType = {
    usersPage: UsersDataType,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean
}
/*type mapDispatchToPropsType = {
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setUsers: (users: UserType[]) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    toggleFetching: (isFetching: boolean) => void
}*/

class UsersContainer extends React.Component<UsersPropsType> {
    componentDidMount() {
        this.props.toggleFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleFetching(false)
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
            });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleFetching(true)

        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleFetching(false)
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader />: ''}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                usersPage={this.props.usersPage}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
            />
        </>
    }
}

const mapStateToProps = (state: mapStateToPropsType): mapStateToPropsType => {
    return {
        usersPage: state.usersPage,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}

/*const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        follow: (userId: string) => {
            dispatch(follow(userId));
        },
        unfollow: (userId: string) => {
            dispatch(unfollow(userId));
        },
        setUsers: (users: UserType[]) => {
            dispatch(setUsers(users));
        },
        setCurrentPage: (pageNumber: number) => {
            dispatch(setCurrentPage(pageNumber))
        },
        setTotalUsersCount: (totalUsersCount: number) => {
            dispatch(setTotalUsersCount(totalUsersCount))
        },
        toggleFetching: (isFetching: boolean) => {
            dispatch(toggleFetching(isFetching))
        }
    }

}*/


// @ts-ignore
export default connect(mapStateToProps,{follow,unfollow,setUsers,setCurrentPage,setTotalUsersCount,toggleFetching})(UsersContainer)

//<mapStateToPropsType, mapDispatchToPropsType, {}, AppStateType>


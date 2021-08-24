import React from 'react';
import {UsersDataType, UserType} from '../../Redux/users-reducer';
import s from './Users.module.css'
import axios from 'axios';
import userPhoto from './images/userPhoto.jpg'

type UsersPropsType = {
    usersPage: UsersDataType,
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setUsers: (users: UserType[]) => void
}

class Users extends React.Component<UsersPropsType> {
    componentDidMount() {
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.usersPage.currentPage}&count=${this.props.usersPage.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalUsersCount)
            })
    }

    onPageChanged = (pageNumber: number)=> {
        this.props.setCurrentPage(pageNumber);
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.usersPage.currentPage}&count=${this.props.usersPage.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

        const pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        return (

            <div>
                <div>
                    {pages.map(p=> {
                        return <span
                            className={ this.props.currentPage === p
                            && s.selectedPage }
                            onClick={(e)=> this.onPageChanged(p)}
                        >{p}</span>
                    })}
                    <span>1</span>
                    <span className={s.selectedPage}>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>

                </div>
                {
                    this.props.usersPage.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img className={s.usersPhoto}
                                 src={u.photos.small !== null
                                     ? u.photos.small
                                     : userPhoto}
                            />
                        </div>
                         <div>
                             {u.followed
                                 ? <button onClick={() => {
                                     this.props.unfollow(u.id)
                                 }}>Unfollow</button>

                                 : <button onClick={() => {
                                     this.props.follow(u.id)
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
}

export default Users;


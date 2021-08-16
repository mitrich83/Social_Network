import React from 'react';
import {UsersDataType, UserType} from '../../Redux/usersReducer';
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
    constructor(props: UsersPropsType) {
        super(props)
        axios
            .get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {

        return (
            <div>

                {
                    this.props.usersPage.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img className={s.usersPhoto}
                                 src={u.photos.small !== null ? u.photos.small : userPhoto}/>
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


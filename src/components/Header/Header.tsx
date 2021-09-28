import React from 'react';
import s from './Header.module.css';
import {NavLink} from 'react-router-dom';
import {logout} from '../../Redux/auth-reducer';

type PropsType = {
    isAuth: boolean
    login: string | null
    // logout: string | null
}

const Header: React.FC<PropsType> = ({ isAuth, login}) => {
    return <header className={s.header}>
        <img
            src="https://img.icons8.com/color/452/avatar.png"
            alt=""/>
        <div className={s.loginBlock}>
            {isAuth
                ? <div>{login} <button onClick={logout}>Logout</button></div>
                : <NavLink to={'/login'}>Login</NavLink>}
        </div>

    </header>
}

export default Header;
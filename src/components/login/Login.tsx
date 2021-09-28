import React from 'react';
import {LoginForm} from './LoginForm';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router';
import {AppStateType} from '../../Redux/redux-store';
import {AuthType} from '../../Redux/auth-reducer';


export const Login = ()=> {
    const isAuth = useSelector<AppStateType>(state=>state.auth.isAuth)
    if(isAuth) {
        return <Redirect to={'/profile'} />
    }

    return <div>
        <h1>LOGIN</h1>
        <LoginForm />
    </div>
}

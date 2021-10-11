import React from 'react';
import {LoginForm} from './LoginForm';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router';
import {AppStateType} from '../../Redux/redux-store';


export const Login = ()=> {
    const isAuth = useSelector<AppStateType>(state=>state.auth.isAuth)
    console.log('Login', isAuth)
    if(isAuth) {
        debugger
        return <Redirect to={'/profile'} />
    }

    return <div>
        <h1>LOGIN</h1>
        <LoginForm />
    </div>
}

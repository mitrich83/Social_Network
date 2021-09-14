import React, {ComponentType} from 'react';
import {Redirect} from 'react-router';
import {AppStateType} from '../Redux/redux-store';
import {connect} from 'react-redux';

type mapStateToPropsForRedirectType = {
    isAuth: boolean
}

const mapStateToPropsForRedirect = (state:AppStateType):mapStateToPropsForRedirectType => ({
    isAuth: state.auth.isAuth
})

export function withAuthRedirect <T>(Component: ComponentType<T>) {
    class RedirectComponent extends React.Component<mapStateToPropsForRedirectType> {
        render() {
            const {isAuth, ...restProps} = this.props
            if(!isAuth) return <Redirect to={'/login'}/>
            return <Component {...restProps as T}/>
        }
    }

const ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
    return ConnectedAuthRedirectComponent
}
import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {logout} from '../../Redux/auth-reducer';
import {AppStateType} from '../../Redux/redux-store';

type PropsType = MapDispatchToPropsType & MapStateToPropsType

class HeaderContainer extends React.Component<PropsType> {

    render() {
        return <Header {...this.props} />
    }
}

type MapStateToPropsType = {
    isAuth: boolean,
    login: string | null
}

type MapDispatchToPropsType = {
    logout: () => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {logout})(HeaderContainer);
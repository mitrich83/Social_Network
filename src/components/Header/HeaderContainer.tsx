import React from 'react';
import Header from './Header';
import axios from 'axios';
import {connect} from 'react-redux';
import {setAuthUserDataAC} from '../../Redux/auth-reducer';
import {AppStateType} from '../../Redux/redux-store';

type PropsType = MapDispatchToPropsType & MapStateToPropsType

class HeaderContainer extends React.Component<PropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
               if(response.data.resultCode === 0){
                   let {id, login, email } = response.data.data;
                   this.props.setAuthUserDataAC(id, login, email)
               }
            });
    }
    render (){
        return <Header {...this.props} />
    }
}

type MapStateToPropsType = {
    isAuth: boolean,
    login: string | null
}

type MapDispatchToPropsType = {
    setAuthUserDataAC: (userId: string, login: string, email: string) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps,{setAuthUserDataAC})(HeaderContainer);
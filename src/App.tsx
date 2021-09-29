import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import {Route} from 'react-router-dom';
import DialogsContainer from './Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import {Login} from './components/login/Login';
import {connect} from 'react-redux';
import {AppStateType} from './Redux/redux-store';
import {RouteComponentProps, withRouter} from 'react-router';
import {compose} from 'redux';
import {initialiseAppTC} from './Redux/app-reducer';
import {Preloader} from './components/common/preloader/Preloader';


type AppPropsType = MapDispatchToPropsType & MapStateToPropsType

class App extends React.Component<AppPropsType, AppStateType> {
    componentDidMount() {
        this.props.initialiseAppTC()
    }
    render() {
        if(!this.props.initialized) return <Preloader/>

        return (
            <div className={'app-wrapper'}>
                <HeaderContainer/>
                <Navbar/>
                <div className={'app-wrapper-content'}>
                    <Route path={'/profile/:userId?'}
                           render={() => <ProfileContainer/>}
                    />
                    <Route path={'/dialogs'}
                           render={() => <DialogsContainer/>
                           }
                    />
                    <Route path={'/users'}
                           render={() => <UsersContainer/>}
                    />
                    <Route path={'/news'} render={() => <News/>}/>
                    <Route path={'/music'} render={() => <Music/>}/>
                    <Route path={'/settings'} render={() => <Settings/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    {/*<Route path={'*'} render={() => <div>404</div>}/>*/}
                </div>
            </div>
        )
    }
}

type MapStateToPropsType = {
    initialized: boolean
}

type MapDispatchToPropsType = {
    initialiseAppTC: () => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    initialized: state.app.initialized
})

export default compose<React.ComponentType>(
    withRouter,
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {initialiseAppTC})(App));

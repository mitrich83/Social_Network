import React from 'react';
import './App.css';
import Header from './Header/Header';
import Navbar from './Navbar/Navbar';
import Profile from './Profile/Profile';
import Dialogs from './Dialogs/Dialogs';
import News from './News/News';
import Music from './Music/Music';
import Settings from './Settings/Settings';
import {BrowserRouter, Route,} from 'react-router-dom';
import {StateType} from './Redux/State';

type AppStateType ={
    appState: StateType
}

function App (props: AppStateType) {
    return (
        <BrowserRouter>
            <div className={'app-wrapper'}>
                <Header/>
                <Navbar/>
                <div className={'app-wrapper-content'}>
                    <Route path={'/profile'} render={ () => <Profile posts={props.appState.profilePage.posts}/>}/>
                    <Route path={'/dialogs'} render={ () => <Dialogs dialogs={props.appState.dialogPage.dialogs} messages={props.appState.dialogPage.messages} />}/>
                    <Route path={'/news'} render={ () => <News/>}/>
                    <Route path={'/music'} render={ () => <Music/>}/>
                    <Route path={'/settings'} render={ () => <Settings/>}/>
                    <Route path={'*'} render={ () => <div>404</div>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

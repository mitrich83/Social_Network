import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './Profile/Profile';
import Dialogs from './Dialogs/Dialogs';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import {Route} from 'react-router-dom';
import {ActionTypes, StateType,} from './Redux/State';

type AppStateType = {
    appState: StateType
    dispatch: (action:ActionTypes) => void
}

function App(props: AppStateType) {
    return (
        <div className={'app-wrapper'}>
            <Header/>
            <Navbar/>
            <div className={'app-wrapper-content'}>
                <Route path={'/profile'}
                       render={() => <Profile
                           newPostText={props.appState.profilePage.newPostText}
                           posts={props.appState.profilePage.posts}
                           dispatch={props.dispatch}

                       />}
                />
                <Route path={'/dialogs'}
                       render={() => <Dialogs
                           dialogs={props.appState.dialogPage.dialogs}
                           messages={props.appState.dialogPage.messages}
                           dispatch={props.dispatch}
                           newMessageTextarea={props.appState.dialogPage.newMessageTextarea}
                       />
                       }
                />
                <Route path={'/news'} render={() => <News/>}/>
                <Route path={'/music'} render={() => <Music/>}/>
                <Route path={'/settings'} render={() => <Settings/>}/>
                <Route path={'*'} render={() => <div>404</div>}/>
            </div>
        </div>
    );
}

export default App;

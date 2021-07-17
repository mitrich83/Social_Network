import React from 'react';
import './App.css';
import Header from './Header/Header';
import Navbar from './Navbar/Navbar';
import Profile from './Profile/Profile';
import Dialogs from './Dialogs/Dialogs';
import News from './News/News';
import Music from './Music/Music';
import Settings from './Settings/Settings';
import {Route} from 'react-router-dom';
import {StateType,} from './Redux/State';

type AppStateType = {
    appState: StateType
    addPost: () => void
    updateNewPostText: (newText: string) => void
    addMessage: () => void
    onChangeTextareaDialogs:(newTextarea: string) => void
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
                           addPost={props.addPost}
                           updateNewPostText={props.updateNewPostText}
                       />}
                />
                <Route path={'/dialogs'}
                       render={() => <Dialogs
                           dialogs={props.appState.dialogPage.dialogs}
                           messages={props.appState.dialogPage.messages}
                           addMessage={props.addMessage}
                           onChangeTextareaDialogs={props.onChangeTextareaDialogs}
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

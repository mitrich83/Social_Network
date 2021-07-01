import React from 'react';
import './App.css';
import Header from './Header/Header';
import Navbar from './Navbar/Navbar';
import Profile from './Profile/Profile';
import Dialogs from './Dialogs/Dialogs';
import {BrowserRouter, Route} from 'react-router-dom';


function App() {
  return (
      <BrowserRouter>
        <div className={'app-wrapper'}>
          <Header/>
          <Navbar/>
          <div className={'app-wrapper-content'}>
            <Route path={'/dialog'} component={Dialogs}/>
            <Route path={'/profile'} component={Profile}/>
            <Dialogs/>
          </div>
        </div>
      </BrowserRouter>
  );
}

export default App;

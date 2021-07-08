import React from 'react';
import './index.css';
import {rerenderEntireTree} from './render';
import state from './Redux/State';


rerenderEntireTree(state);

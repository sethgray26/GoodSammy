import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store.jsx'
import './index.css';
import './reset.css';
import App from './App';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

ReactDOM.render(
    <Provider store={ store }>
        <MuiThemeProvider>
            <App /> 
        </MuiThemeProvider>
    </Provider>,
    
    document.getElementById('root'));

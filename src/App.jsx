import React, { Component } from 'react';
import {Route, HashRouter } from 'react-router-dom';
import './App.css';

import Landing from './comps/Landing/Landing';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Route exact path='/' component={ Landing }/>
          
        </div>
      </HashRouter>
    );
  }
}

export default App;

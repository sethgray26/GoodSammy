import React, { Component } from 'react';
import {Route, HashRouter } from 'react-router-dom';
import './App.css';
import Chat from './comps/Chat/Chat';
import CreateRequest from './comps/CreateRequest/CreateRequest'; 
import RequestList from './comps/RequestList/RequestList';   
// import Map from './comps/Map/Map';

import Landing from './comps/Landing/Landing';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Route exact path='/' component={ Landing }/>
          <Route path='/createreq' component={ CreateRequest }/>
          
        </div>
      </HashRouter>
    );
  }
}

export default App;

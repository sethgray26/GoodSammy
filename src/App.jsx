import React, { Component } from 'react';
import {Route, HashRouter } from 'react-router-dom';
import './App.css';

import Home from './comps/Home/Home.jsx'
import Chat from './comps/Chat/Chat';
import CreateRequest from './comps/CreateRequest/CreateRequest'; 
import RequestList from './comps/RequestList/RequestList';   
import Landing from './comps/Landing/Landing';  
// import Map from './comps/Map/Map';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Route exact path='/' component={ Landing }/>
          <Route exact path='/Home' component={ Home }/>
          <Route path='/createReq' component={ CreateRequest }/>
          <Route path='/reqList' component={ RequestList }/>
        </div>
      </HashRouter>
    );
  }
}

export default App;

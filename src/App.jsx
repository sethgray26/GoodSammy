import React, { Component } from 'react';
import CreateRequest from './comps/CreateRequest/CreateRequest'; 
import RequestList from './comps/RequestList/RequestList';   
import {Route, HashRouter } from 'react-router-dom';
import Landing from './comps/Landing/Landing';  
import Home from './comps/Home/Home.jsx'
import ViewRequest from './comps/ViewRequest/ViewRequest'
import Chat from './comps/Chat/Chat';
import './App.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Route exact path='/' component={ Landing }/>
          <Route exact path='/Home' component={ Home }/>
          <Route path='/createReq' component={ CreateRequest }/>
          <Route path='/reqList' component={ RequestList }/>
          <Route path= '/request/:id' component={ ViewRequest }/> 
        </div>
      </HashRouter>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import Chat from './comps/Chat/Chat';
import CreateRequest from './comps/CreateRequest/CreateRequest'; 
import RequestList from './comps/RequestList/RequestList';   
// import Map from './comps/Map/Map';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Chat/>
        <CreateRequest/>
      </div>
    );
  }
}

export default App;

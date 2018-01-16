import React, { Component } from 'react';
import './App.css';
import CreateRequest from './comps/CreateRequest/CreateRequest'; 
import RequestList from './comps/RequestList/RequestList';   

class App extends Component {
  render() {
    return (
      <div className="App">
            <CreateRequest/>
      </div>
    );
  }
}

export default App;

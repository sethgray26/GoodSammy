import renderer from 'react-test-renderer'
import React from 'react'
import ReactDOM from 'react-dom'
import Home from './Home'
import { Router } from 'react-router'


test('using renderer', ()=>{
    // const component = renderer.create( <Router> <Home/> </Router> );
    // let tree = component.toJSON();
    // expect(1).toBeTruthy();

    const home = new Home();
    
    // const div = document.createElement('div');
    // ReactDOM.render(<Home />, div)
    // ReactDOM.unmountComponentAtNode(div)
    // let home = new Home();
    // console.log(home);
  })
import renderer from 'react-test-renderer'
import React from 'react'
import ReactDOM from 'react-dom'
import Chat from './Chat'


test('using renderer', ()=>{
    // const component = renderer.create( <Router> <Home/> </Router> );
    // let tree = component.toJSON();
    // expect(1).toBeTruthy();

    const home = new Chat();
    home.setState = (state)=>{
        console.log(state.messageInput ==="I get set")
    }
    home.handleChange({target:{value:"I get set"}});
    // const div = document.createElement('div');
    // ReactDOM.render(<Home />, div)
    // ReactDOM.unmountComponentAtNode(div)
    // let home = new Home();
    // console.log(home);
  })
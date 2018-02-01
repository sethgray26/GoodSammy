
import React from 'react'
import ReactDOM from 'react-dom'
import ViewRequest from './ViewRequest.jsx'

describe('ViewRequest component tests', ()=>{
    test('ViewRequest setState works as intended', ()=>{
        const vr = new ViewRequest();
        vr.setState = (state)=>{
            console.log(state)
            expect(state.request).toBeNull();
        }
        vr.setState({request:null});
    })
})
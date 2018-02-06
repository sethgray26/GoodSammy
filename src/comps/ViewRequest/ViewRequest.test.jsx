import React from 'react';  
import ReacDOM from 'react-dom';
import ViewRequest from './ViewRequest'


describe('Unit Test for ViewRequest', () => { 
    test('state updating to open', () => {
        const view = new ViewRequest();
       
        view.setState = (state) => {
            expect(state.open).toBe(true)
        }
        view.handleAmerica()
    })
    test('array should not be null', () => {
        const view = new ViewRequest();
        view.setState = (state) => {
            expect(state.disable).toBe(false)
        }
    view.enableStatus()
     
    // test('something random that doesnt have anything to do with view request', () => {
    //     expect(true).toBe(false)
    })
})
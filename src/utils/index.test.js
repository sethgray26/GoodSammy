// import React from 'react';
// import ReacDOM from 'react-dom';
// import ViewRequest from './ViewRequest'

const fn = require('./functions');
const {setLocationState} = require('../ducks/reducers/maps')


describe('Milking the only function that returns something', () => {
    test('Should be defined', () => {
      expect(fn.getDateString()).toBeDefined()
    })
  })

  test('Should be type of string', () => {
    expect(typeof (fn.getDateString())).toBe('string')
  })
  test('Should be truthy', () => {
    expect(fn.getDateString()).toBeTruthy()
  })

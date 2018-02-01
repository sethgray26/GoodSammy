
import fn from './functions';
// import Chat from './../comps/Chat/Chat'
// const Chat = require('./../comps/Chat/Chat');
// const {setLocationState} = require('../ducks/reducers/maps')

//Google API should pass in 4 numbers (origin/destination of lat/long) and the type (string)
//Faye
// describe('actions', () => {
//     it('should create an action to add a todo', () => {
//       const expectedAction = 'SET_LOCATION_STATE'
//       expect(setLocationState(40.2262209,-111.6608687).type).toEqual(expectedAction)
//     })
//   })

//Set Date
//Faye
// test('must return a date', () => {
//     expect(typeof (fn.getDateString())).toBe('string')
// })

//Get Google API should return an array

//Set Location should pass in 2 numbers as req.body (long lat) - Faye

//Set Location should pass in a number as req.params.id - Faye

//Get Request should respond with an array

//Get Request/:id should pass in a number

// Nate 
describe('nate\'s tests', ()=>{
  test('1 is 1', ()=>{
    expect(1).toEqual(1)
  })
  test('fn.getDateString() returns truthy value', ()=>{
    expect(fn.getDateString()).toBeTruthy();
  })
  

})
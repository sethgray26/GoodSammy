const fn = require('./functions');

//Google API should pass in 4 numbers (origin/destination of lat/long) and the type (string) - Faye
// test('lat longs must be numbers', () => {
//     console.log(setLocationState(2,4))
//     expect(setLocationState(2, 4)).equal.to()
// })

//Set Date
test('must return a date', () => {
    expect(typeof (fn.getDateString())).toBe('string')
})

//Get Google API should return an array - Faye

//Set Location should pass in 2 numbers as req.body (long lat) - Faye

//Set Location should pass in a number as req.params.id - Faye

//Get Request should respond with an array

//Get Request/:id should pass in a number
//import axios from 'axios';
const axios = require('axios');

//initial state
const initialState = {
    isLoading: false,
    error: false,
    lat: '',
    lng: '',
    distanceArr: []  // arr of req_ids and distanc from user
    
}

const SET_LOCATION = 'SET_LOCATION'
const SET_LOCATION_STATE = 'SET_LOCATION_STATE'
const STORE_DISTANCES = 'STORE_DISTANCES'

//Action Creators
export function setLocation(id, lat, lng) {
    // console.log('action creator', id, lat, lng)
    return {
        type: SET_LOCATION,
        // payload: [{lat:lat, lng:lng}]
        payload: axios.put(`/setLocation/${id}`, { lng: lng, lat: lat })
            .then(res => {
                
                return res.data
            })
    }
}
export function storeDistances(arr){
    return{
        type: STORE_DISTANCES,
        payload: arr
    }
}

export function setLocationState(lat, lng) {
        return {
            type: SET_LOCATION_STATE,
            payload: [{ lat: lat, lng: lng }]
        }
}

//Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        //Get Profile Data
        case SET_LOCATION_STATE: //test
            // console.log('lat red', action.payload[0].lat)
            // console.log('lng red', action.payload[0].lng)
            return Object.assign({}, state, { lng: action.payload[0].lng, lat: action.payload[0].lat })
        case SET_LOCATION + '_PENDING':
            // console.log('pending')
            return Object.assign({}, state, { isLoading: true })
        case SET_LOCATION + '_FULFILLED':
            // console.log('lat red', action.payload[0].lat)
            // console.log('lng red', action.payload[0].lng)
            return Object.assign({}, state, { lng: action.payload[0].lng, lat: action.payload[0].lat })
        case SET_LOCATION + '_REJECTED':
            console.log('reject')
            return Object.assign({}, state, { error: true })

        default:
            return state;
    }
}

// module.exports = {
//     setLocationState: setLocationState,
//     reducer
// }
import axios from 'axios';

//initial state
const initialState = {
    isLoading: false,
    error: false,
    requests:[]
}

const CREATE_REQUEST = 'CREATE_REQUEST'

//Action Creators
export function createRequest(obj) {
console.log('ac', obj)
    return {
        type: CREATE_REQUEST,
        payload: axios.post('/createRequest',obj)
            .then(res => {
                console.log('res', res.data)
                return res.data
            }).catch(err => {console.log(err)})
    }
}

//Reducer
export default function reducer(state = initialState, action) {
    // console.log("reducer", action.payload)
    switch (action.type) {
        case CREATE_REQUEST + '_PENDING':
            return Object.assign({}, state, { isLoading: true })
        case CREATE_REQUEST + '_FULFILLED':
            return Object.assign({}, state, {requests: action.payload })
        case CREATE_REQUEST + '_REJECTED':
            return Object.assign({}, state, { error: true })
        default:
            return state;
    }
}
import axios from 'axios';

//initial state
const initialState = {
    isLoading: false,
    error: false,
    requests:[]
}

const CREATE_REQUEST = 'CREATE_REQUEST'

//Action Creators
export function createRequest(user_id,category_id,desc, lat,lng) {
    console.log('action creator', user_id,category_id,desc, lat,lng)
    return {
        type: CREATE_REQUEST,
        payload: axios.post(`/createRequest`,{user_id: user_id, category_id: category_id,desc:desc,lat:lat,lng:lng})
            .then(res => {
                console.log('then', res.data)
                return res.data
            })
    }
}

//Reducer
export default function reducer(state = initialState, action) {
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
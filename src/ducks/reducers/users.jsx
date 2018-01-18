import axios from 'axios'

const initialState = {
    userData: {},
    error: false
}

const CREATE_USERS = 'CREATE_USERS'

export function createUsers( userData ){
    //action creatrot
    console.log('AC', userData)

    let newUser = axios.post('/createUser', {username: userData.username, password: userData.password, phone: userData.phone })
    .then( res => res.data )
    return {
        type: CREATE_USERS,
        payload: newUser
    }
}


export default function reducer( state = initialState, action ){
  switch (action.type) {
        case CREATE_USERS + '_FULFILLED':
            return Object.assign({}, state, { userData: action.payload })
        case CREATE_USERS + '_REJECTED':
            return Object.assign({}, state, { error: true })
        default:
            return state;
    }  
}
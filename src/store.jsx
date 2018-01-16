import { applyMiddleware, createStore } from "redux"
import reducer from './ducks/index.js';
import reduxPromiseMiddleware from 'redux-promise-middleware';

export default createStore(reducer, applyMiddleware(reduxPromiseMiddleware()));
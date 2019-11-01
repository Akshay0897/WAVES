import {createStore,applyMiddleware} from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import ReduxThunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'

const middlewares = [logger,ReduxThunk,promiseMiddleware];

export const store = createStore(rootReducer,applyMiddleware(...middlewares));

export default { store };
import { createStore, applyMiddleware } from 'redux'
import reducer from '@/store/reducers'
import { localStorageMiddleware } from '@/store/middlewares'

export default createStore(reducer, applyMiddleware(localStorageMiddleware))

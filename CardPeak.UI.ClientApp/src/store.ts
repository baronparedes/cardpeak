import { createStore, Store, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducers, { RootState } from './services/reducers'

const middleware = applyMiddleware(thunk, createLogger());
export const store: Store<RootState> = createStore(reducers, middleware);
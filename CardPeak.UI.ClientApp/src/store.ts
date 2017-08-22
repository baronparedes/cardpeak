import { createStore, Store, applyMiddleware } from 'redux'
import { logger } from 'redux-logger'
import reducers, { RootState } from './services/reducers'

const middleware = applyMiddleware(logger);
export const store: Store<RootState> = createStore(reducers, middleware);
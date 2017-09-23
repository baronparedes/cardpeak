import { createStore, Store, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducers, { RootState } from './services/reducers'

let middleware;
if (__NODE_ENV__ === 'dev') {
    middleware = applyMiddleware(thunk);
}
else {
    middleware = applyMiddleware(thunk, createLogger());
}
export const store: Store<RootState> = createStore(reducers, middleware);
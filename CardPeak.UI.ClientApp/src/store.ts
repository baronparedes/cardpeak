import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import reducers, { RootState } from './services/reducers';
import { createLogger } from 'redux-logger'

let middleware;
if (__NODE_ENV__ === 'production') {
    middleware = applyMiddleware(thunk);
} else {
    middleware = applyMiddleware(thunk, createLogger());
}
export const store: Store<RootState> = createStore(
    reducers,
    middleware
);

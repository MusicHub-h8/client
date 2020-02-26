import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';

const composeEnhancers = composeWithDevTools({ trace: true });

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;

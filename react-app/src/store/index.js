import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";

const appReducer = combineReducers({
  // add individual reducer key-value pairs here.
  session: sessionReducer,
});

const rootReducer = (state, action) => {
  // The following can be used to clear redux state entirely on logout (if we trigger a USER_LOGOUT action on logout):
  // if (action.type === 'USER_LOGOUT') {
  //   state = undefined
  // }
  return appReducer(state, action)
}

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

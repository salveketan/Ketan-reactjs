import { legacy_createStore, combineReducers, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk"
import productReducer from "./reducer"

const rootReducer = combineReducers({
    productData: productReducer
})

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

export const store = legacy_createStore(
    rootReducer,
    // composeEnhancers(applyMiddleware(thunk))
);

console.log(store.getState());
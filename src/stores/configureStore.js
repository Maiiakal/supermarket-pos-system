// universal states

import { combineReducers, createStore } from "redux";
import categoryReducer from "./ducks/categories";
import productsReducer from "./ducks/products";

const reducer = combineReducers({
  categories: categoryReducer,
  products: productsReducer,
});

const store = createStore(reducer);

export default store;

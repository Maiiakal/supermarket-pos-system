// universal states

import { combineReducers, createStore } from "redux";
import categoryReducer from "./ducks/categories";
import productsReducer from "./ducks/products";
import cartsReducer from "./ducks/carts";

const reducer = combineReducers({
  categories: categoryReducer,
  products: productsReducer,
  carts: cartsReducer,
});

const store = createStore(reducer);

export default store;

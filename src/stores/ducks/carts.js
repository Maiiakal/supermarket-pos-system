import { CartGenerator, ProductsGenerator } from "../../features/Data";

const CREATE_CART = "Cart/create";
const UPDATE_CART = "Cart/update";
const DELETE_CART = "Cart/delete";

const UPDATE_SELECTED_CART = "Cart/current/update";

export const createCart = (cart) => ({
  type: CREATE_CART,
  cart,
});

export const updateCart = (cart) => ({
  type: UPDATE_CART,
  cart,
});

export const deleteCart = (cart) => ({
  type: DELETE_CART,
  cart,
});

export const updateSelectedCart = (cart) => ({
  type: UPDATE_SELECTED_CART,
  cart,
});

const initialState = {
  list: CartGenerator(2),
  currentCart: {
    id: 0,
    items: [],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CART:
      return {
        ...state,
        list: [...state.list, { ...action.cart }],
      };
    case UPDATE_CART:
      return {
        ...state,
        list: state.list.map((cart) =>
          cart.id === action.cart.id ? action.cart : cart
        ),
      };
    case DELETE_CART:
      return {
        ...state,
        list: state.list.filter(
          (cart) => action.cart.id !== cart.id
        ),
      };
    case UPDATE_SELECTED_CART:
      return {
        ...state,
        currentCart: action.cart,
      };
    default:
      return state;
  }
};

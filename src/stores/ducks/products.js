import { ProductsGenerator } from "../../features/Data";

const CREATE_PRODUCT = "Product/create";
const UPDATE_PRODUCT = "Product/update";
const DELETE_PRODUCT = "Product/delete";

export const createProduct = (product) => ({
  type: CREATE_PRODUCT,
  product,
});

export const updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  product,
});

export const deleteProduct = (product) => ({
  type: DELETE_PRODUCT,
  product,
});

const initialState = {
  list: ProductsGenerator(30),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      return {
        ...state,
        list: [...state.list, { ...action.product }],
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        list: state.list.map((product, index) =>
          index === action.index ? { ...action.product } : product
        ),
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        list: state.list.filter((product, index) => index !== action.index),
      };
    default:
      return state;
  }
};

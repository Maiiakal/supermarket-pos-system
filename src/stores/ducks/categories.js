import { CategoryGenerator } from "../../features/Data";

const CREATE_CATEGORY = "Category/create";
const UPDATE_CATEGORY = "Category/update";
const DELETE_CATEGORY = "Category/delete";

const UPDATE_SELECTED_CATEGORY = "Category/current/update";

export const createCategory = (category) => ({
  type: CREATE_CATEGORY,
  category,
});

export const updateCategory = (category) => ({
  type: UPDATE_CATEGORY,
  category,
});

export const deleteCategory = (category) => ({
  type: DELETE_CATEGORY,
  category,
});

export const updateSelectedCategory = (categoryName) => ({
  type: UPDATE_SELECTED_CATEGORY,
  payload: categoryName,
});

const initialState = {
  list: CategoryGenerator(10),
  selectedCategory: "All Categories",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CATEGORY:
      return {
        ...state,
        list: state.list.filter(
          (category) => action.category.id !== category.id
        ),
        list: [...state.list, { ...action.category }],
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        list: state.list.map((category) =>
          category.id === action.category.id ? action.category : category
        ),
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        list: state.list.filter(
          (category) => action.category.id !== category.id
        ),
      };
    case UPDATE_SELECTED_CATEGORY:

      return {
        ...state,
        selectedCategory: action.payload,
      };
    default:
      return state;
  }
};

import * as actionTypes from "../actions/actionTypes";

const initState = {
  loading: false,
  list: [],
  item: {},
};

export default function category(state = initState, action) {
  switch (action.type) {
    case actionTypes.GET_ALL_CATEGORY:
      return { ...state, loading: true };
    case actionTypes.GET_ALL_CATEGORY_SUCCESS:
      return { ...state, loading: false, list: action.data };
    case actionTypes.GET_ONE_CATEGORY:
      return { ...state, loading: true };
    case actionTypes.GET_ONE_CATEGORY_SUCCESS:
      return { ...state, loading: false, item: action.data };
    case actionTypes.CREATE_CATEGORY:
      return { ...state, loading: true };
    case actionTypes.CREATE_CATEGORY_SUCCESS:
      return { ...state, loading: false, list: state.list.concat(action.data) };
    case actionTypes.UPDATE_CATEGORY:
      return { ...state, loading: true };
    case actionTypes.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        list: state.list.map((item) =>
          item._id === action.data.id ? action.data.body : item
        ),
      };
    case actionTypes.DELETE_CATEGORY:
      return { ...state, loading: true };
    case actionTypes.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        list: state.list.filter((item) => item._id !== action.data),
      };
    case actionTypes.SELECT_CATEGORY:
      return {
        ...state,
        item: state.list.find((item) => item._id === action.data),
      };
    case actionTypes.UNSELECT_CATEGORY:
      return {
        ...state,
        item: {},
      };
    default:
      return state;
  }
}

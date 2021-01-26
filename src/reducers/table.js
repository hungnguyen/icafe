import * as actionTypes from "../actions/actionTypes";

const initState = {
  loading: false,
  list: [],
  item: {},
};

export default function table(state = initState, action) {
  switch (action.type) {
    case actionTypes.GET_ALL_TABLE:
      return { ...state, loading: true };
    case actionTypes.GET_ALL_TABLE_SUCCESS:
      return { ...state, loading: false, list: action.data };
    case actionTypes.GET_ONE_TABLE:
      return { ...state, loading: true };
    case actionTypes.GET_ONE_TABLE_SUCCESS:
      return { ...state, loading: false, item: action.data };
    case actionTypes.CREATE_TABLE:
      return { ...state, loading: true };
    case actionTypes.CREATE_TABLE_SUCCESS:
      return { ...state, loading: false, list: state.list.concat(action.data) };
    case actionTypes.UPDATE_TABLE:
      return { ...state, loading: true };
    case actionTypes.UPDATE_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        list: state.list.map((item) =>
          item._id === action.data.id ? action.data.body : item
        ),
      };
    case actionTypes.DELETE_TABLE:
      return { ...state, loading: true };
    case actionTypes.DELETE_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        list: state.list.filter((item) => item._id !== action.data),
      };
    case actionTypes.SELECT_TABLE:
      return {
        ...state,
        item: action.data,
      };
    case actionTypes.UNSELECT_TABLE:
      return {
        ...state,
        item: {},
      };
    default:
      return state;
  }
}

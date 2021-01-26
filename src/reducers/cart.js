import * as actionTypes from "../actions/actionTypes";

const initState = {
  loading: false,
  list: [],
  item: {},
};

export default function cart(state = initState, action) {
  switch (action.type) {
    case actionTypes.GET_ALL_CART:
      return { ...state, loading: true };
    case actionTypes.GET_ALL_CART_SUCCESS:
      return { ...state, loading: false, list: action.data };
    case actionTypes.GET_ONE_CART:
      return { ...state, loading: true };
    case actionTypes.GET_ONE_CART_SUCCESS:
      return { ...state, loading: false, item: action.data };
    case actionTypes.CREATE_CART:
      return { ...state, loading: true };
    case actionTypes.CREATE_CART_SUCCESS:
      return { ...state, loading: false, list: state.list.concat(action.data) };
    case actionTypes.UPDATE_CART:
      return { ...state, loading: true };
    case actionTypes.UPDATE_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        list: state.list.map((item) =>
          item._id === action.data.id ? action.data.body : item
        ),
      };
    case actionTypes.DELETE_CART:
      return { ...state, loading: true };
    case actionTypes.DELETE_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        list: state.list.filter((item) => item._id !== action.data),
      };
    case actionTypes.SELECT_CART:
      return {
        ...state,
        item: action.data,
      };
    case actionTypes.UNSELECT_CART:
      return {
        ...state,
        item: {},
      };

    //cart item actions
    case actionTypes.CREATE_CARTITEM:
      return { ...state, loading: true };
    case actionTypes.CREATE_CARTITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        list: state.list.map((item) =>
          item._id === action.data.cartId
            ? {
                ...item,
                totalAmount:
                  parseInt(item.totalAmount) + parseInt(action.data.amount),
                items: item.items.concat(action.data),
              }
            : item
        ),
      };
    case actionTypes.UPDATE_CARTITEM:
      return { ...state, loading: true };
    case actionTypes.UPDATE_CARTITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        list: state.list.map((cart) =>
          cart._id === action.data.id
            ? {
                ...cart,
                totalAmount: action.data.totalAmount,
                items: cart.items.map((item) =>
                  item._id === action.data.itemId ? action.data.body : item
                ),
              }
            : cart
        ),
      };
    case actionTypes.DELETE_CARTITEM:
      return { ...state, loading: true };
    case actionTypes.DELETE_CARTITEM_SUCCESS:
      return { ...state, loading: false };
    default:
      return state;
  }
}

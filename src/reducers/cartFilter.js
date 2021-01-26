import * as actionTypes from "../actions/actionTypes";

const initState = {
  date: "",
};

export default function cartFilter(state = initState, action) {
  switch (action.type) {
    case actionTypes.UPDATE_FILTER_CART:
      return action.data;
    case actionTypes.REMOVE_FILTER_CART:
      return initState;
    default:
      return state;
  }
}

import * as actionTypes from "../actions/actionTypes";

const initState = {
  list: [],
  item: {},
};

export default function log(state = initState, action) {
  switch (action.type) {
    case actionTypes.ADD_LOG:
      return {
        ...state,
        list: state.list.concat({
          id: new Date(),
          body: action.data,
          read: false,
        }),
      };
    case actionTypes.OPEN_LOG:
      return {
        ...state,
        item: state.list.find((item) => item.id === action.data),
        list: state.list.map((item) =>
          item.id === action.data ? { ...item, read: true } : item
        ),
      };

    default:
      return state;
  }
}

import { combineReducers } from "redux";
import table from "./table";
import food from "./food";
import category from "./category";
import cart from "./cart";
import cartFilter from "./cartFilter.js";

const rootReducer = combineReducers({
  table,
  food,
  cart,
  category,
  cartFilter,
});

export default rootReducer;

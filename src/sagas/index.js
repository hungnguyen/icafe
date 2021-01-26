import { all } from "redux-saga/effects";
import tableSaga from "./tableSaga";
import foodSaga from "./foodSaga";
import categorySaga from "./categorySaga";
import cartSaga from "./cartSaga";

export default function* rootSaga() {
  yield all([tableSaga(), foodSaga(), categorySaga(), cartSaga()]);
}

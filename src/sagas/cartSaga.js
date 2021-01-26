import * as actionTypes from "../actions/actionTypes";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../api/cartApi";

function* getAll(action) {
  try {
    const res = yield call(api.getAll, action.data);
    yield put(actions.getAllCartSuccess(res));
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

function* getOne(action) {
  try {
    const res = yield call(api.getOne, action.data);
    yield put(actions.getOneCartSuccess(res));
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

function* create(action) {
  try {
    const res = yield call(api.create, action.data);
    yield put(actions.createCartSuccess(res));
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

function* update(action) {
  try {
    yield call(api.update, action.data);
    yield put(actions.updateCartSuccess(action.data));
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

function* remove(action) {
  try {
    yield call(api.remove, action.data);
    yield put(actions.deleteCartSuccess(action.data));
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

function* createCartItem(action) {
  try {
    const res = yield call(api.createCartItem, action.data);
    yield put(actions.createCartItemSuccess(res));
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

function* updateCartItem(action) {
  try {
    yield call(api.updateCartItem, action.data);
    yield put(actions.updateCartItemSuccess(action.data));
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

function* removeCartItem(action) {
  try {
    yield call(api.removeCartItem, action.data);
    yield put(actions.deleteCartItemSuccess);
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

export default function* cartSaga() {
  yield takeLatest(actionTypes.GET_ALL_CART, getAll);
  yield takeLatest(actionTypes.GET_ONE_CART, getOne);
  yield takeEvery(actionTypes.CREATE_CART, create);
  yield takeEvery(actionTypes.UPDATE_CART, update);
  yield takeEvery(actionTypes.DELETE_CART, remove);

  yield takeEvery(actionTypes.CREATE_CARTITEM, createCartItem);
  yield takeEvery(actionTypes.UPDATE_CARTITEM, updateCartItem);
  yield takeEvery(actionTypes.DELETE_CARTITEM, removeCartItem);
}

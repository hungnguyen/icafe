import * as actionTypes from "../actions/actionTypes";
import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../api/foodApi";

function* getAll() {
  try {
    const res = yield call(api.getAll);
    yield put(actions.getAllFoodSuccess(res));
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

function* getOne(action) {
  try {
    const res = yield call(api.getOne, action.data);
    yield put(actions.getOneFoodSuccess(res));
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

function* create(action) {
  try {
    const res = yield call(api.create, action.data);
    yield put(actions.createFoodSuccess(res));
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

function* update(action) {
  try {
    yield call(api.update, action.data);
    yield put(actions.updateFoodSuccess(action.data));
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

function* remove(action) {
  try {
    yield call(api.remove, action.data);
    yield put(actions.deleteFoodSuccess(action.data));
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

export default function* FoodSaga() {
  yield takeLatest(actionTypes.GET_ALL_FOOD, getAll);
  yield takeLatest(actionTypes.GET_ONE_FOOD, getOne);
  yield takeLatest(actionTypes.CREATE_FOOD, create);
  yield takeLatest(actionTypes.UPDATE_FOOD, update);
  yield takeLatest(actionTypes.DELETE_FOOD, remove);
}

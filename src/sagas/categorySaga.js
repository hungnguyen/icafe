import * as actionTypes from "../actions/actionTypes";
import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../api/categoryApi";

function* getAll() {
  try {
    const res = yield call(api.getAll);
    yield put(actions.getAllCategorySuccess(res));
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

function* getOne(action) {
  try {
    const res = yield call(api.getOne, action.data);
    yield put(actions.getOneCategorySuccess(res));
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

function* create(action) {
  try {
    const res = yield call(api.create, action.data);
    yield put(actions.createCategorySuccess(res));
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

function* update(action) {
  try {
    yield call(api.update, action.data);
    yield put(actions.updateCategorySuccess(action.data));
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

function* remove(action) {
  try {
    yield call(api.remove, action.data);
    yield put(actions.deleteCategorySuccess(action.data));
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

export default function* categorySaga() {
  yield takeLatest(actionTypes.GET_ALL_CATEGORY, getAll);
  yield takeLatest(actionTypes.GET_ONE_CATEGORY, getOne);
  yield takeLatest(actionTypes.CREATE_CATEGORY, create);
  yield takeLatest(actionTypes.UPDATE_CATEGORY, update);
  yield takeLatest(actionTypes.DELETE_CATEGORY, remove);
}

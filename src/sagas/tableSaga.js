import * as actionTypes from "../actions/actionTypes";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../api/tableApi";

function* getAll() {
  try {
    const res = yield call(api.getAll);
    yield put(actions.getAllTableSuccess(res));
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

function* getOne(action) {
  try {
    const res = yield call(api.getOne, action.data);
    yield put(actions.getOneTableSuccess(res));
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

function* create(action) {
  try {
    const res = yield call(api.create, action.data);
    yield put(actions.createTableSuccess(res));
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

function* update(action) {
  try {
    yield call(api.update, action.data);
    yield put(actions.updateTableSuccess(action.data));
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

function* remove(action) {
  try {
    yield call(api.remove, action.data);
    yield put(actions.deleteTableSuccess(action.data));
  } catch (e) {
    yield put(actions.addLog(e));
  }
}

export default function* tableSaga() {
  yield takeLatest(actionTypes.GET_ALL_TABLE, getAll);
  yield takeLatest(actionTypes.GET_ONE_TABLE, getOne);
  yield takeEvery(actionTypes.CREATE_TABLE, create);
  yield takeEvery(actionTypes.UPDATE_TABLE, update);
  yield takeEvery(actionTypes.DELETE_TABLE, remove);
}

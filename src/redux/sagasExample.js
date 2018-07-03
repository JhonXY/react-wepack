import { delay } from 'redux-saga'
import { put, takeEvery, call, fork } from 'redux-saga/effects'

// ...
export function* helloSaga() {
  console.log('hello sagas');
}

// Our worker Saga: 将执行异步的 increment 任务
export function* incrementAsync() {
  yield call(delay, 1000)
  yield put({
    type: 'INCREMENT'
  })
}

// 在每个 INCREMENT_ASYNC action spawn 一个新的 incrementAsync 任务
export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

export default function* () {
  yield fork(helloSaga)
  yield fork(watchIncrementAsync)
}
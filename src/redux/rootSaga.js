import {
  fork,
  call
} from 'redux-saga/effects'
import example from './sagasExample'

export default function* rootSaga() {
  yield fork(example);
}
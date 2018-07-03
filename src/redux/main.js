import { createStore, applyMiddleware, compose } from 'redux'
// 创建一个 Saga middleware
import createSagaMiddleware from 'redux-saga'

import SagaManager from './SagaManager'
import rootSaga from './rootSaga'


// 模拟所有的actions
// state会以initialState传入
const reducer = function (state, action) {
    switch (action.type) {
      case 'INCREMENT': 
        return {
          num: state.num + 1
        }
      case 'INCREMENT_IF_ODD': 
        return {num: 0}
      case 'DECREMENT':
        return {
          num: state.num - 1
        }
      // case 'INCREMENT_ASYNC':
      //   return {
      //     num: state.num - 1
      //   }
      default:
        return state
    }
  }

const sagaMiddleware = createSagaMiddleware()

const initialState = {
  num: 0
}

const enhancer = compose(
  // 使用 applyMiddleware 将 middleware 连接至 Store
  applyMiddleware(sagaMiddleware)
)

const store = createStore(
  reducer,
  initialState,
  enhancer
)

sagaMiddleware.run(rootSaga)

// SagaManager.startSagas(sagaMiddleware)

const action = type => store.dispatch({type})

export { store, action }
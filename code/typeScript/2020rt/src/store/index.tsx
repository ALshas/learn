import {createStore, applyMiddleware} from 'redux'
import promise from 'redux-promise'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducers from './reducers'
import history from '../store/history'
import {routerMiddleware} from 'connected-react-router'  //帮助我们实现了在redux中操作路由的方法 并将路由变化信息同步在redux中的store
let store = createStore(reducers, applyMiddleware(routerMiddleware(history), promise, thunk, logger))
export default store
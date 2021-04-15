import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import history from '../history'
import home from './home'
import mine from './mine'
import profile from './profile'
let reducers = {
    home,
    mine,
    profile,
    router: connectRouter(history)
}
let reducer = combineReducers(reducers)
export type TypeRootState = {
    [key in keyof typeof reducers]:ReturnType<typeof reducers[key]>
}
console.log(reducer)
export default reducer
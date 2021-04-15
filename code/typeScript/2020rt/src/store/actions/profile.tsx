import * as TYPES from '../action.types'
import {Dispatch, Store} from 'redux'
import {validate, register, login, logout} from '../../api/profile'
import {TypeAnyObject, TypeThunkFunction} from '../../typings/common'
// import register from '../../routes/Register'
import { message, Result } from 'antd'
import {TypeRootState} from '../../store/reducers'
import { ImportOutlined } from '@ant-design/icons'
import {push} from 'connected-react-router'
export default {
    // setCurrentCategory(payload:any){
    //     return {type: 'setCurrentCategory', payload}
    // }
    // 这个方法，可以传递给组件，让组件调用，用来向服务器发请求
    validate(){
        // redux-promise 中间件会拦截掉这个action 判断如果payload是一个promise,那么会等待promise完成，吧payload值变成promise resolvec出来的值，重新派发给仓库
       return {
           type: TYPES.VALIDATE,
           payload: validate()
       }
    },
    // 注册用户
    register(values: TypeAnyObject):TypeThunkFunction{
        return async function (dispatch:Dispatch, getState:Store['getState']) {
            let result: TypeAnyObject = await register(values);
            if(result.code == 0){
                dispatch(push('/login'))
            }else{
                message.error(result.error);
            }
        }
    },
    // 登录
    login(values: TypeAnyObject):TypeThunkFunction{ 
        return async function (dispatch:Dispatch) {
            let result: TypeAnyObject = await login(values);
            if(result.code == 0){
                dispatch(push('/profile'))
            }else{
                message.error(result.error);
            }
        }
        // return function (dispatch:Dispatch) {
        //     login(values).then((result: TypeAnyObject)=>{
        //         if(result.code == 0){
        //             dispatch(push('/profile'))
        //         }else{
        //             message.error(result.error);
        //         } 
        //     })
        // }
    },
    // 退出登录
    logout(){
        return {
            type: TYPES.LOGOUT,
            payload: logout()
        }
    }
}
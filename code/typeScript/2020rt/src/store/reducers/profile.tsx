import { Types } from 'mongoose';
import {TypeAction} from '../../typings/common'
import LOGIN_TYPES from '../../typings/login-types'
import * as TYPES from '../action.types'
export interface TypeProfile{
    loginState: LOGIN_TYPES,
    user: any, //如果用户已经登录 把登录信息放在这里
    error: any, //如果用户登录失败 吧失败的原因放在这里
//    currentCategory: String
}
let initialState = {
    // currentCategory: 'all'
    loginState: LOGIN_TYPES.UNLOGIN,
    user: null,
    error: null
}
export default function (state:TypeProfile = initialState, action: TypeAction){
 switch(action.type){
     case TYPES.VALIDATE:
         let {code, data, error} = action.payload;
         if(code === 0){  //说明处理登录状态
           return {...state, loginState: LOGIN_TYPES.LOGINED, user: data, error: null}
         }else{//  当前用户未登录
           return {...state, loginState: LOGIN_TYPES.UNLOGIN, user: null, error}
         }
     case TYPES.LOGOUT:
      return {...state, loginState: LOGIN_TYPES.UNLOGIN, user: null, error}
     default: 
        return state;
 }
}
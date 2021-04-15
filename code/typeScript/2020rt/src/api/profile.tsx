import { TypeAnyObject } from '../typings/common'
import axios from './'
export function validate(){
    // 这个promise resolve出来的值就是一个对象 code:0, data:......
    return axios.get('/validate')
}  
export function register(values: TypeAnyObject){
    // 这个promise resolve出来的值就是一个对象 code:0, data:......
    return axios.post('/register', values)
}  
export function login(values: TypeAnyObject){
    return axios.post('/login', values)
}
export function logout(){
    return axios.get('/logout')
}

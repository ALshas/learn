import {TypeAction} from '../../typings/common'
export interface TypeMine{
//    currentCategory: String
}
let initialState = {
    // currentCategory: 'all'
}
export default function (state:TypeMine = initialState, action: TypeAction){
 switch(action.type){
     default: 
        return state;
 }
}
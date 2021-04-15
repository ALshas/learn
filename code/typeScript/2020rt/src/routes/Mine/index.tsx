import React from 'react'
import {connect} from 'react-redux'
import {TypeRootState} from '../../store/reducers'
import {TypeMine} from '../../store/reducers/mine'
import actions from '../../store/actions/mine'
import {RouteComponentProps} from 'react-router'
import './index.less'
interface State{

}
//当前的组件有三个属性来源
//1、mapStateToProps的返回值 2. actions对象类型 3 来自路由 4 用户传入进来的其他属性
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
interface IParams {}
type RouteProps = RouteComponentProps<IParams>;
type Props = StateProps&DispatchProps&RouteProps&{
    children?:any             //自己的自定义属性  ？是说可有可无
}
class mine extends React.Component<Props, State>{
   render(){
       return(
           <div>我的</div>
       )
   }    
}
let mapStateToProps = (state: TypeRootState):TypeMine => state.mine
export default connect(
    mapStateToProps,
    actions
)(mine);
import React from 'react'
import {connect} from 'react-redux'
import {TypeRootState} from '../../store/reducers'
import {TypeHome} from '../../store/reducers/home'
import actions from '../../store/actions/home'
import {RouteComponentProps} from 'react-router'
import HomeHeader from './HomeHeader/index'
import HomeSliders from './HomeSliders/index'
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
class Home extends React.Component<Props, State>{
    homeContainerRef: any
    constructor(props:Props){
        super(props)
        this.homeContainerRef = React.createRef()
    }
   render(){ 
       return(
           <>
           <HomeHeader setCurrentCategory={this.props.setCurrentCategory} currentCategory={ this.props.currentCategory} />
            <div className='home-container' ref={this.homeContainerRef}>
                <HomeSliders sliders={this.props.sliders} getSliders={this.props.getSliders}></HomeSliders>
            </div>
           </>
       )
   }    
}
let mapStateToProps = (state: TypeRootState):TypeHome => state.home
export default connect(
    mapStateToProps,
    actions
)(Home);
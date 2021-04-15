import React from 'react'
import {connect} from 'react-redux'
import {TypeRootState} from '../../store/reducers'
import {TypeProfile} from '../../store/reducers/profile'
import actions from '../../store/actions/profile'
import {RouteComponentProps} from 'react-router'
import './index.less'
import LOGIN_TYPES from '../../typings/login-types'
import { Button, Descriptions,Alert,Upload, message} from 'antd';
import NavHeader from '../../components/NavHeader';
interface State{

}
//当前的组件有三个属性来源
//1、mapStateToProps的返回值 2. actions对象类型 3 来自路由 4 用户传入进来的其他属性
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
interface IParams {}
// {
//     location: {pathname: string, state: any}
//     match: {path: string, exact: boolean, url: string, params?:any}
//     history: {push}
// }
type RouteProps = RouteComponentProps<IParams>;
type Props = StateProps&DispatchProps&RouteProps&{
    children?:any             //自己的自定义属性  ？是说可有可无
}
class Profile extends React.Component<Props, State>{
  state = {loading:false, imageUrl: ''}
   async componentDidMount(){  
        //组件挂载完成
        await this.props.validate()    
        // if(this.props.loginState === LOGIN_TYPES.UNLOGIN){
            // 向服务器发请求， 询问服务器当前用户的登录状态
            
        // }
    }
    handleChange = (info:any)=>{
       if(info.file.status === 'uploading'){
           this.setState({loading:true})
       }else if(info.file.status === 'done'){
           //获取到接口的响应体
           let {code, data, error} = info.file.response; 
           if(code === 0){
               this.setState({ 
                   loading: false,
                   imageUrl: info.file.response.url
               })
           }else{
               message.error(error)
           }
       }
    }
   render(){
       let {user} = this.props
       let content;  //里存放着要渲染的内容
    //    if(this.props.loginState === LOGIN_TYPES.UN_VALIDATE){
    //     content = null
    //    }else 
       if(this.props.loginState === LOGIN_TYPES.LOGINED){
            let imageUrl = this.state.imageUrl || user.avatar
            content = (
                <div className="user-info">
                    <Descriptions title="User Info">
                        <Descriptions.Item label="头像">
                            <Upload beforeUpload={beforeUpload} data={{userId: user._id}} onChange={this.handleChange} name='avatar' listType='picture-card' className='avatar-uploader' showUploadList={false} action='http://localhost:9000/uploadAvatar'></Upload>
                        </Descriptions.Item>
                        <Descriptions.Item label="用户名">{user.username}</Descriptions.Item>
                        {/* <Descriptions.Item label="手机号">{user.}</Descriptions.Item> */}
                        <Descriptions.Item label="邮箱">{user.email}</Descriptions.Item>
                    </Descriptions>
                    <Button type='dashed' onClick={async event=>{
                        await this.props.logout();
                        this.props.history.push('/login')
                    }}>退出登录</Button>
                </div>
            )
       }else/*当前用户尚未登陆*/{
        content = (
            <>
              <Alert type='warning' message='当前未登录' description='亲爱的用户你好，你当前未登录，请选择注册或登 录' />
              <div style={{textAlign: 'center', padding: '0.5rem'}}>
                  <Button type='dashed' onClick={()=>this.props.history.push('/login')}>登录</Button>
                  <Button type='dashed' onClick={()=>this.props.history.push('/register')} style={{marginLeft:'0.5rem'}}>注册</Button>
              </div>
            </>
        )
       }
       return(
           (
               <section>
                   <NavHeader history={this.props.history}>个人中心</NavHeader>
                   {content}
                </section>
           )
       )
   }    
}
let mapStateToProps = (state: TypeRootState):TypeProfile => state.profile
export default connect(
    mapStateToProps,
    actions
)(Profile);
function beforeUpload(){

}
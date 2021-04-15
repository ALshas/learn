import React from 'react'
import NavHeader from '../../components/NavHeader';
import {connect} from 'react-redux'
import actions from '../../store/actions/profile'
import {TypeRootState} from '../../store/reducers'
import {TypeProfile} from '../../store/reducers/profile'
import {RouteComponentProps, Link} from 'react-router-dom'
import {Form, Button, Input} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
interface IParams {}
type RouteProps = RouteComponentProps<IParams>;
type Props = StateProps&DispatchProps&RouteProps&{
    children?:any             //自己的自定义属性  ？是说可有可无
}
class Login extends React.Component<Props>{
    handleSubmit = (value) =>{
        this.props.login(value)
    }
    render(){ 
        return (
            <>
              <NavHeader history={this.props.history}>登录</NavHeader>
              <Form onFinish={this.handleSubmit}>
              <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className='login-form-button'
                    >
                        登录
                    </Button>
                    或者
                    <Link to='/login'>立即注册</Link>
                </Form.Item>
              </Form>
            </>
        )
    }
}
// let wrappedRegister = Form.create({name: '注册表单'})(Register);
let mapStateToProps = (state: TypeRootState):TypeProfile => state.profile
export default connect(
    mapStateToProps,
    actions
)(Login)
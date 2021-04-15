import React from 'react'
import { NavLink } from 'react-router-dom'  //导航链接 
import { HomeOutlined, ShoppingCartOutlined, UserOutlined} from '@ant-design/icons';
import './index.less'
export default class Tabs extends React.Component{
    render(){
        return (
            <footer>
                <NavLink exact to='/'><HomeOutlined type="home"/><span>首页</span></NavLink>
                <NavLink exact to='/mine'><ShoppingCartOutlined type="cart" /><span>我的</span></NavLink>
                <NavLink exact to='/profile'><UserOutlined type="user" /><span>个人中心</span></NavLink>
            </footer>
        )
    }
} 
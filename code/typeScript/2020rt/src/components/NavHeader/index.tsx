import React from 'react'
import './index.less'
import {LeftOutlined} from  '@ant-design/icons'
interface Props{
    history: any
}
export default class NavHeader extends React.Component<Props>{
    render(){
        return <div className='nav-header'>
            <LeftOutlined type='left' onClick={()=>this.props.history.goBack()}/>
            {this.props.children}
        </div>
    }
}
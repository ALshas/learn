import React from 'react';
import ReactDOM from 'react-dom'
import {Switch, Route, Redirect} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store'
import './assets/common.less'   //公共样式
import {ConnectedRouter} from 'connected-react-router'   //路由容器
import history from './store/history'
import Home from './routes/Home'
import Mine from './routes/Mine'
import Login from './routes/Login'
import Register from './routes/Register'
import Profile from './routes/Profile'
import Tab from './components/tab'

// import 
ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <main className='main-container'>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/Mine' exact component={Mine} />
                    <Route path='/Profile' exact component={Profile} />
                    <Route path='/login' exact component={Login} />
                    <Route path='/register' exact component={Register} />

                    {/* //如果不是上面的哪几个 就重定向到根目录 */}
                    <Redirect to='/'></Redirect>   
                </Switch>
            </main>
            <Tab />
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'))
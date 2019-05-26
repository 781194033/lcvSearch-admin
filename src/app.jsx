/*
 * @Author: shijie
 * @Date:   2019-01-29 12:28:46
 * @Last Modified by:   shijie
 * @Last Modified time: 2019-01-29 13:13:24
 */
import React from 'react';
import ReactDOM from 'react-dom';
import LuckyUtil from 'util/lucky.jsx';

const _lucky=new LuckyUtil();
import {HashRouter,BrowserRouter,Route,Link,Switch,Redirect } from 'react-router-dom';
//通用组件
import Layout from 'component/layout/index.jsx';
//页面
import Home from 'page/home/index.jsx';
//登录组件
import Login from 'page/login/index.jsx';
//错误页面
import ErrorPage from 'page/error/index.jsx';
//商品
import ProductRouter from 'page/product/router.jsx';
import UserList from 'page/user/index.jsx';
import HotWords from 'page/hotwords/index.jsx';

import 'antd/dist/antd.css';
class App extends React.Component{
	constructor(props){
		super(props)
	}
	
	render(){
        let LayoutRouter = (
            <Layout> 
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/product" component={ProductRouter}/>
                    <Route path="/user/index" component={UserList}/>
                    <Route path="/hotwords/index" component={HotWords}/>
                    <Redirect exact from="/user" to="/user/index"/>
                    <Redirect exact from="/hotwords" to="/hotwords/index"/>

                    <Redirect exact from="/order" to="/order/index"/>
                    <Route component={ErrorPage}/>
                </Switch>
            </Layout>
        );
        return (
            <HashRouter>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" render={ props => LayoutRouter}/>
                </Switch>
            </HashRouter>
        )
    }
}

ReactDOM.render(
	<App/>,
	document.getElementById('app')
);


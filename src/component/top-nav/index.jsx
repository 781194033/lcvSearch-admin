import React from 'react';
import {Link} from 'react-router-dom';
import LuckyUtil from 'util/lucky.jsx';
import User from 'service/user-service.jsx';


const _lucky=new LuckyUtil();
const _user=new User();


class TopNav extends React.Component{
	constructor(props){
		super(props);
        this.state={
            username:_lucky.getStorage('userInfo').username || ''
        }
	}

    //退出登录
    onLogout(){
        _user.logout().then((res) => {
            //退出登录成功删除本地存储，回到登录页面
            _lucky.removeStorage('userInfo');
            window.location.href='/#/login';
        },(errMsg) => {
            _lucky.errorTips(errMsg);
        })
    }

	render(){
		 return (
            <div className="navbar navbar-default top-navbar">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/"><b>专利</b>搜索</Link>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" href="javascript:;">
                            <i className="fa fa-user fa-fw"></i>
                            {
                                this.state.username ? <span>欢迎,{this.state.username}</span> : <span>欢迎您</span>
                           		
                            }
                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li>
                                <a onClick={this.onLogout.bind(this)}>
                                    <i className="fa fa-sign-out fa-fw"></i>
                                    <span>退出登录</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
	}
}


export default TopNav;
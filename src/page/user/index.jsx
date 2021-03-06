import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import User from 'service/user-service.jsx';
import LuckyUtil from 'util/lucky.jsx';
import TableList from 'util/table-list/index.jsx'; 



const _user = new User();
const _lucky = new LuckyUtil();


class UserList extends React.Component{
	constructor(props){
		super(props);
		this.state={
			pageNum : 1,
			list:[],
			total:0,
			page:1,
			firstLoading : true
		}
	}
	componentDidMount(){
		this.loadeUserList();
	}
	loadeUserList(){
		_user.getUserList(this.state.pageNum).then((res) => {
			this.setState(Object.assign({},{page:this.state.pageNum},res));
		},(errMsg) => {
			this.setState({
				list : []
			})
			 _lucky.errTips(errMsg);
		});
	}
	//当页数变化的时候 
	onPageNumChange(pageNum){
		this.setState({
			pageNum : pageNum
		},() => {
			this.loadeUserList();
		})
	}
	render(){
		let listBody = this.state.list.map((user, index) => {
            return (
                <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role === 1 ? "普通用户" : "管理员"}</td>
                    <td>{user.create_time}</td>
                </tr>
            );
        });
       return (
            <div id="page-wrapper">
                <PageTitle title="用户列表"/>
                <TableList tableHeads={['ID', '用户名', '邮箱', '类型', '注册时间']}>
                    {listBody}
                </TableList>
                <Pagination current={this.state.pageNum} 
                    total={this.state.total} 
                    onChange={(pageNum) => this.onPageNumChange(pageNum)}/>
            </div>
        );
	}
}




export default UserList;
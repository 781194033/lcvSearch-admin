import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import Statistic from 'service/statistic-service.jsx';
import LuckyUtil from 'util/lucky.jsx';
import TableList from 'util/table-list/index.jsx'; 



const statistic = new Statistic();
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
		statistic.getHotWords().then((res) => {
			console.log(res)
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
		let listBody = this.state.list.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item}</td>

                </tr>
            );
        });
       return (
            <div id="page-wrapper">
                <PageTitle title="热词列表"/>
                <TableList tableHeads={['ID','热词']}>
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
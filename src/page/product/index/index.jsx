import React from 'react';
import {Link} from 'react-router-dom';
import LuckyUtil from 'util/lucky.jsx';
import Product from 'service/product-service.jsx';
import PageTitle from 'component/page-title/index.jsx';
import ListSearch from './index-list-search.jsx';
import TableList from 'util/table-list/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import { Modal } from 'antd';



const _lucky = new LuckyUtil();
const _product = new Product();

import './index.scss';

class ProductList extends React.Component{
	constructor(props){
		super(props);
		this.state={
			pageNum : 1,
			list:[],
			total:0,
			visible:false,
			row_data:{}
		}
	}
	//组件加载完成请求列表（发送请求）
	componentDidMount(){
		this.loadProductList();
	}
	handleDelete(data) {
		if (window.confirm("确定删除吗？")) {
			_product.deletePatent({"id":data._id,"index":data._index}).then(
				//请求成功
				(res) => {
					alert("删除成功")
					this.loadProductList();	
				},
				//请求失败
				(errMsg) => {
					alert(errMsg)
				}
			)
		}
		
	}
	handleView(data) {
		this.showModal()
		this.setState({row_data:data})
	}
	showModal() {
		this.setState({visible:true})
	}
	hideModal() {
		this.setState({visible:false})
	}
	//加载商品列表
	loadProductList(){
		let listParam={};
		listParam.pageNum=this.state.pageNum;
		listParam.searchType=this.state.searchType || '';
		listParam.searchKeyword=this.state.searchKeyword || '';
		//请求接口
		_product.getProductList(listParam).then(
			//请求成功
			(res) => {
				this.setState(res);
			},
			//请求失败
			(errMsg) => {
				//失败不显示任何商品
				this.setState({
					list : []
				})
				_lucky.errTips(errMsg);
			}
		)
	}
	handleCancel(){
		this.hideModal()
	}
	//搜索
	onSearch(searchType,searchKeyword){
		//搜索改变state后重新请求数据
		this.setState({
			pageNum : 1,
			searchType : searchType,
			searchKeyword : searchKeyword
		},() => {
			this.loadProductList();
		})
	}
	//页数发生改变的时候,改变state，重新发送请求
	onPageNumChange(pageNum){
		this.setState({
			pageNum : pageNum
		},() => {
			this.loadProductList()
		})
	}
	render(){
		let tableHeads=[
			{id:'标题',width:'80%'},
			{id:'操作',width:'20%'}
		];
		return(
			<div id="page-wrapper">

				<PageTitle title="专利列表">
					
				</PageTitle>
				<ListSearch onSearch={(searchType, searchKeyword) => {this.onSearch(searchType, searchKeyword)}}/>

				<TableList tableHeads={tableHeads}>
					{
						this.state.list.map((product,index) => {
							return(
								<tr key={index}>
									<td>{product['标题']}</td>
									<td>
										<p className="operate">
											<span onClick={this.handleDelete.bind(this,product)}>删除</span>
										</p>
										<p className="operate">
											<span onClick={this.handleView.bind(this,product)}>查看</span>
										</p>
									</td>
								</tr>
							)
						})
					}
				</TableList>
				<Modal
		          title="详情"
		          visible={this.state.visible}
		          onCancel={this.handleCancel.bind(this)}
		        >
		          {
		          	Object.keys(this.state.row_data).map((cur,index) => {
		          		if (cur != "suggest") {
		          			var value = this.state.row_data[cur]
		          			return (
			          			<div key={index}>
			          				<label>{cur}:</label>
			          				<span>{value}</span>
			          			</div>
		          			)
		          		}
		          		
		          	})
		          }
		        </Modal>
				<Pagination current={this.state.pageNum}
					total={this.state.total}
					onChange={this.onPageNumChange.bind(this)} />
			</div>
		)
	}
}




export default ProductList;

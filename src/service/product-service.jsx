import React from 'react';
import LuckyUtil from 'util/lucky.jsx';


const _lucky = new LuckyUtil();



class Product{
	//请求商品列表
	getProductList(listParam){
		let url='';
		let data ={};
		data.pageNum = listParam.pageNum;
		data.searchKeyword = listParam.searchKeyword;
		data.pageNum = listParam.pageNum;
		data.searchType = listParam.searchType;


		return _lucky.request({
			url : '/manage/patentlist/',
			type : 'post',
			data : data
		})
	}

	deletePatent(data) {
		return _lucky.request({
			url : '/manage/delete_by_id/',
			type : 'post',
			data : data
		})
	}

}




export default Product;
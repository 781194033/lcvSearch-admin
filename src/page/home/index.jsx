import React from 'react';
import './index.scss';
import PageTitle from 'component/page-title/index.jsx';
import {Link} from 'react-router-dom';
import Statistic from 'service/statistic-service.jsx';
import LuckyUtil from 'util/lucky.jsx';
import addChineseUnit from 'util/addChineseUnit.js'
const _satatistic = new Statistic();
const _lucky = new LuckyUtil();  



class Home extends React.Component{
	constructor(props){
		super(props);
		this.state={
			TIcount : 2,
			costomCount : 34,
			textileCount : 89,
			visitedCount : 10
		}
	}
    componentDidMount(){
    	this.loadeCount();
    }
	loadeCount(){
		_satatistic.getHomeCount().then((res) => {
			this.setState(res);
		},(errMsg) => {
			_lucky.errTips(errMsg)
		})
	}
	render(){
		return(
			<div id="page-wrapper">
				<PageTitle title="首页" />
				<div className="row">
					<div className="col-md-4">
						<Link to="/product/index" className="color-box brown">
							<p className="count">{addChineseUnit(this.state.TIcount,2)}</p>
							<p className="desc">
								<i className="fa fa-apple"></i>
								<span>TI总数</span>
							</p>
						</Link>
					</div>
					<div className="col-md-4">
						<Link to="/product/index" className="color-box green">
							<p className="count">{addChineseUnit(this.state.costomCount,2)}</p>
							<p className="desc">
								<i className="fa fa-list"></i>
								<span>服装总数</span>
							</p>
						</Link>
					</div>
					<div className="col-md-4">
						<Link to="/product/index" className="color-box blue">
							<p className="count">{addChineseUnit(this.state.textileCount,2)}</p>
							<p className="desc">
								<i className="fa fa-check-square-o"></i>
								<span>纺织总数</span>
							</p>
						</Link>
					</div>
				</div>
				<br/>
				<div className="row">
					<div className="col-md-4">
						
					</div>
					<div className="col-md-4">
						<Link to="/" className="color-box mycolor">
							<p className="count">{addChineseUnit(this.state.visitedCount,2)}</p>
							<p className="desc">
								<i className="fa fa-eye"></i>
								<span>访问次数</span>
							</p>
						</Link>
					</div>
					<div className="col-md-4">
						
					</div>
				</div>
			</div>
		)
	}
}


export default Home;
import React            from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// 页面
import ProductList      from 'page/product/index/index.jsx';
class ProductRouter extends React.Component{
    render(){
        return (
            <Switch>
                <Route path="/product/index" component={ProductList}/>
            </Switch>
        )
    }
}
export default ProductRouter;
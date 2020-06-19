import React, { Component } from 'react';
import { isNil, isEmpty } from 'lodash';
import SpinnerComponent from '../custom-components/custom-spinner';
import CustomError from '../custom-components/custom-error';
import ProductItem from '../components/product-item';
import ApiHelper from '../utilities/api-helper';
import emptyListIcon from '../resources/empty-list.png';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class ProductList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            limit: 10,
            activePage: 1,
            loading: true,
        }
        this.getProductList = this.getProductList.bind(this);
        this.refreshList = this.refreshList.bind(this);
    }

    componentWillMount() {
        this.getProductList();
    }

    componentWillReceiveProps() {
        this.getProductList();
    }

    render() {
        return (
            <div className='product-list-container'>
                <div className='product-list-header'>Product List</div>
                <CustomError errorMessage={this.state.error} />
                { this.renderProductList() }
            </div>
        )
    }

    renderEmptyListSection() {
        return <img className='invalid-route-image' src={emptyListIcon} alt={'empty-list'}></img>
    }

    renderProductList() {
        const self = this;
        const { products, total, loading } = this.state;
        const { isAdmin } = this.props;
        return <div className='product-list'>
            {
                (isEmpty(products) && loading === false) ? this.renderEmptyListSection() :
                    <InfiniteScroll
                        dataLength={products.length}
                        next={this.refreshList}
                        hasMore={products.length < total }
                        loader={<SpinnerComponent style={{ padding: '24px', background: 'white' }} />}
                        endMessage={
                            <p className='reached-end-of-list'>
                                Yay! You have seen it all
                            </p>
                        }>
                        {
                            <div>
                                {
                                    products.map(function (item, index) {
                                        return <div className='product-item' key={'product-' + index}>
                                            <ProductItem
                                                product={item}
                                                index={index}
                                                isAdmin={isAdmin}
                                                refreshList={self.getProductList}
                                            />
                                        </div>
                                    })
                                }
                            </div>
                        }
                    </InfiniteScroll>
            }
        </div>
    }

    refreshList() {
        this.setState({
            loading: true,
            activePage: this.state.activePage + 1
        }, () => this.getProductList(true))
    }

    getProductList = async (updateProducts) => {
        let {products, limit, activePage} = this.state;
        const skip = (activePage - 1) * limit
        const res = await ApiHelper.getData(`/products/getAllProducts?limit=${limit}&skip=${skip}`);
        if (!isNil(res.data.products)) {
            if (updateProducts) {
                products = products.concat(res.data.products);
            } else {
                products = res.data.products;
            }
            this.setState({
                products: products,
                total: res.data.total,
                error: null,
                loading: false,
                message: res.data.message,
            })
        } else {
            this.setState({
                total: 0,
                message: res.data.error,
                loading: false
            })
        }
    }
}
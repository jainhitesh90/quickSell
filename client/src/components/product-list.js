import React, { Component } from 'react';
import { isNil, isEmpty } from 'lodash';
import Pagination from "react-js-pagination";
import SpinnerComponent from '../custom-components/custom-spinner';
import CustomError from '../custom-components/custom-error';
import ProductItem from '../components/product-item';
import ApiHelper from '../utilities/api-helper';
import emptyListIcon from '../resources/empty-list.png'

export default class ProductList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            showSpinner: true,
            limit: 10,
            activePage: 1
        }
        this.getProductList = this.getProductList.bind(this);
    }

    componentWillMount() {
        this.getProductList();
    }

    componentWillReceiveProps() {
        this.getProductList();
    }

    render() {
        return (
            <div>
                <div className='product-list-header'>
                    <p className='header'>Product List</p>
                </div>
                <CustomError errorMessage={this.state.error} />
                {
                    this.state.showSpinner ? <SpinnerComponent style={{padding: '96px', background: 'white'}}/> : <div>
                        {this.renderProductList()}
                        {this.renderPagination()}
                    </div>
                }
            </div>
        )
    }

    renderEmptyListSection() {
        return <div>
            <img className='invalid-route-image' src={emptyListIcon} alt={'empty-list'}></img>
        </div>
    }

    renderProductList() {
        const self = this;
        const { products, activePage, limit } = this.state;
        const { isAdmin } = this.props;
        return <div className='product-list'>
            {
                isEmpty(products) ? this.renderEmptyListSection() :
                    <div>
                        {
                            products.map(function (item, index) {
                                return <div className='product-item' key={'product-' + index}>
                                    <ProductItem
                                        product={item}
                                        index={((activePage - 1) * limit) + index}
                                        isAdmin={isAdmin}
                                        refreshList={self.getProductList}
                                    />
                                </div>
                            })
                        }
                    </div>
            }
        </div>

    }

    getProductList = async () => {
        const limit = this.state.limit;
        const skip = (this.state.activePage - 1) * limit
        const res = await ApiHelper.getData(`/products/getAllProducts?limit=${limit}&skip=${skip}`);
        if (!isNil(res.data.products)) {
            this.setState({
                products: res.data.products,
                total: res.data.total,
                error: null,
                showSpinner: false,
                message: res.data.message
            }, () => window.scrollTo({ top: 0, behavior: 'smooth' }))
        } else {
            this.setState({
                products: [],
                total: 0,
                message: res.data.error,
                showSpinner: false
            })
        }
    }

    renderPagination() {
        const { limit, activePage, total } = this.state;
        if (isEmpty(this.state.products)) {
            return null;
        }
        return (
            <div className={'pagination-container'}>
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={limit}
                    totalItemsCount={total}
                    pageRangeDisplayed={limit}
                    onChange={this.handlePageChange.bind(this)}
                    itemClass="page-item"
                    linkClass="page-link"
                />
            </div>
        );
    }

    handlePageChange(pageNumber) {
        this.setState({
            activePage: pageNumber
        }, this.getProductList);
    }
}
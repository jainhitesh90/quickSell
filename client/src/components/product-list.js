import React, { Component } from 'react';
import { Label } from 'reactstrap';
import { isNil, isEmpty } from 'lodash';
import SpinnerComponent from '../custom-components/custom-spinner';
import ApiHelper from '../utilities/api-helper';
import CustomError from '../custom-components/custom-error';
import ProductItem from '../components/product-item';
import Pagination from "react-js-pagination";

export default class ProductList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            showSpinner: true,
            limit: 5,
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
                <div className='product-list-container'>
                    <CustomError errorMessage={this.state.error} />
                    {this.renderProductList()}
                </div>
                {this.renderPagination()}
            </div>
        )
    }

    renderProductList() {
        const self = this;
        const { products, activePage, limit } = this.state;
        const { isAdmin } = this.props;
        if (this.state.showSpinner) {
            return <SpinnerComponent />
        } else return <div>
            {
                isEmpty(products) ? <CustomError errorMessage={'No Products added till now.'} /> :
                    <div className='product-list-table'>
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
                error: null,
                showSpinner: false,
                message: res.data.message
            })
        } else {
            this.setState({
                products: [],
                message: res.data.error,
                showSpinner: false
            })
        }
    }

    renderPagination() {
        return (
            <div className={'pagination-container'}>
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={5}
                    totalItemsCount={20}
                    pageRangeDisplayed={5}
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
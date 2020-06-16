import React, { Component } from 'react';
import { Row, Col, Label } from 'reactstrap';
import { isNil, isEmpty } from 'lodash';
import AddProductModal from './add-product-modal';
import DeleteProductModal from './delete-product-modal';
import SpinnerComponent from '../custom-components/custom-spinner';
import ApiHelper from '../utilities/api-helper';
import CustomError from '../custom-components/custom-error';

export default class ProductList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            showSpinner: true
        }
        this.getProductList = this.getProductList.bind(this);
        this.onAddProducSuccessfully = this.onAddProducSuccessfully.bind(this);
        this.onCancelAddProduct = this.onCancelAddProduct.bind(this);
        this.onDeleteProductSuccessfully = this.onDeleteProductSuccessfully.bind(this);
        this.onCancelDeleteProduct = this.onCancelDeleteProduct.bind(this);
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
                {this.renderEditProductModal()}
                {this.renderDeleteProductModal()}
                <div className='product-list-container'>
                    <CustomError errorMessage={this.state.error} />
                    {this.renderProductList()}
                </div>
            </div>
        )
    }

    renderEditProductModal() {
        if (this.state.showEditProductModal) {
            return <AddProductModal
                product={this.state.selectedProduct}
                showModal={this.state.showEditProductModal}
                onCancel={this.onCancelAddProduct}
                onSuccess={this.onAddProducSuccessfully}
            />
        }
    }

    renderDeleteProductModal() {
        if (this.state.showDeleteProductModal) {
            return <DeleteProductModal
                product={this.state.selectedProduct}
                showModal={this.state.showDeleteProductModal}
                onCancel={this.onCancelDeleteProduct}
                onSuccess={this.onDeleteProductSuccessfully}
            />
        }
    }

    onAddProducSuccessfully() {
        this.setState({
            showEditProductModal: false,
            showSpinner: true,
            selectedProduct: null
        }, this.getProductList);
    }

    onCancelAddProduct() {
        this.setState({
            showEditProductModal: false,
            selectedProduct: null
        });
    }

    onDeleteProductSuccessfully() {
        this.setState({
            showDeleteProductModal: false,
            showSpinner: true,
            selectedProduct: null
        }, this.getProductList);
    }

    onCancelDeleteProduct() {
        this.setState({
            showDeleteProductModal: false,
            selectedProduct: null
        });
    }

    renderProductList() {
        const self = this;
        const { products } = this.state;
        const { isAdmin } = this.props;
        if (this.state.showSpinner) {
            return <SpinnerComponent />
        } else return <div >
            <div className='product-list-header-section'>
                <Label className='header'>My Products!!</Label>
            </div>
            {
                isEmpty(products) ? <CustomError errorMessage={'No Products added till now.'} /> :
                    <div className='product-list-table'>
                        {
                                products.map(function (item, index) {
                                return <div className='product-item' key={'product-' + index}>
                                    <Row className='product-item'>
                                        <Col xs={6} sm={2}>
                                            <Label className='product-item-title'>{item.name}</Label>
                                        </Col>
                                        <Col xs={6} sm={3}>
                                            <Label className='product-item-title'>{item.description}</Label>
                                        </Col>
                                        <Col xs={6} sm={3}>
                                            <Label className='product-item-title'>{item.price}</Label>
                                        </Col>
                                        {
                                            isAdmin ?  <Col xs={2} sm={2} className='align-center-horizontally'>
                                            <Label onClick={() => self.editProduct(item)} className='product-item-action'>Edit</Label>
                                        </Col> : null
                                        }
                                        {
                                            isAdmin ?  <Col xs={2} sm={2} className='align-center-horizontally'>
                                            <Label onClick={() => self.deleteProduct(item)} className='product-item-action'>Delete</Label>
                                        </Col> : null
                                        }
                                    </Row>
                                </div>
                            })
                        }
                    </div>
            }
        </div>

    }

    getProductList = async () => {
        const res = await ApiHelper.getData('/products/getAllProducts');
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

    editProduct = async (product) => {
        this.setState({
            selectedProduct: product,
            showEditProductModal: true
        })
    }

    deleteProduct = async (product) => {
        this.setState({
            selectedProduct: product,
            showDeleteProductModal: true
        })
    }
}
import React, { Component } from 'react';
import AddProductModal from '../components/add-product-modal';
import ProductList from '../components/product-list';

export default class AdminHomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div>
                {this.renderAddProductModal()}
                {this.renderAddProductButton()}
                <ProductList isAdmin={true}/>
            </div>
        )
    }

    renderAddProductModal() {
        if (this.state.showModal) {
            return <AddProductModal
                showModal={this.state.showModal}
                onCancel={() => this.setState({ showModal: false })}
                onSuccess={() => this.setState({ showModal: false })}
            />
        }
    }

    renderAddProductButton() {
        return <div className={'add-product'} onClick={() => this.setState({ showModal: true })}> + </div>
    }
}
import React, { Component } from 'react';
import ProductList from '../components/product-list';

export default class UserHomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <ProductList />
        )
    }
}